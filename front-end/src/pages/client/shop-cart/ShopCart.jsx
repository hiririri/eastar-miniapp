import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "@tarojs/components";
import { AtNavBar, AtButton, AtInputNumber, AtCard, AtIcon } from "taro-ui";
import { useSelector } from "react-redux";

import "./ShopCart.scss";
import { create } from "lodash";

function ShopCart() {
  const [cart, setCart] = useState([]);

  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.value;
    }, 0);
  };

  const [addToCartBarHeight, setAddToCartBarHeight] = useState(0);
  const [addToNavBarHeight, setAddToNavBarHeight] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 显示加载提示框
    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });

    // 模拟数据加载
    setTimeout(() => {
      // 隐藏加载提示框
      Taro.hideLoading();

      const query = Taro.createSelectorQuery();
      query
        .select("#cart-bar")
        .boundingClientRect((rect) => {
          if (rect) setAddToCartBarHeight(rect.height);
          console.log("cart bar : ", rect.height);
        })
        .exec();
      query
        .select("#nav-bar")
        .boundingClientRect((rect) => {
          if (rect) setAddToNavBarHeight(rect.height);
          console.log("nav-bar : ", rect.height);
        })
        .exec();

      const fetchCart = async () => {
        try {
          const res = await Taro.getStorage({ key: "cart" });
          setCart(res.data);
        } catch (error) {
          Taro.setStorage({ key: "cart", data: [] });
        }
      };

      fetchCart();

      setIsLoading(false); // 这里模拟加载完成，实际使用时你可能需要根据数据加载的结果来设置
    }, 1000); // 这里模拟2秒的加载时间
  }, []);

  console.log("cart : ", cart);

  const handleQuantityChange = async (id, value) => {
    let newCart;

    if (value === 0) {
      // Filter out the product with the given id.
      newCart = cart.filter((product) => product.id !== id);
    } else {
      // Otherwise, map over the productList as before.
      newCart = cart.map((product) => {
        if (product.id === id) {
          return { ...product, value: value };
        } else {
          return product;
        }
      });
    }

    // Now we can safely call setCart to update the state.
    setCart(newCart);

    // And store the updated cart in storage.
    try {
      await Taro.setStorage({ key: "cart", data: newCart });
    } catch (error) {
      console.error("Could not retrieve cart:", error);
    }
  };

  const createOrder = async (cartData) => {
    try {
      const orderId = generateOrderId(); // 生成订单ID
      await Taro.setStorage({ key: "cart", data: [] });
      setCart([]);

      // 获取已有订单
      const storageInfo = await Taro.getStorageInfo();
      let orders;
      if (storageInfo.keys.indexOf("order") !== -1) {
        const res = await Taro.getStorage({ key: "order" });
        orders = res.data;
      } else {
        orders = [];
      }

      console.log("orders : ", orders);

      // 创建新订单
      const newOrder = { id: orderId, status: "unpayed", items: cartData };

      // 将新订单添加到已有订单列表
      orders.push(newOrder);

      // 保存订单列表
      await Taro.setStorage({ key: "order", data: orders });

      const res = await Taro.getStorage({ key: "order" });
      console.log("order : ", res.data);
    } catch (error) {
      console.error("Could not create order:", error);
    }
  };

  const generateOrderId = () => {
    // 生成订单ID的逻辑，可以使用时间戳、UUID等方法
    // 这里以时间戳为例
    return Date.now().toString();
  };

  const isCartEmpty = cart.length === 0;
  console.log("isCartEmpty : ", isCartEmpty);

  return (
    <View className="shop-cart">
      <View
        id="nav-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: systemInfo?.safeArea?.top
            ? systemInfo.safeArea.top + "px"
            : "48px",
          backgroundColor: "#94bbe9",
          zIndex: 1,
        }}
      >
        <AtNavBar
          border={false}
          className="nav-bar"
          title="购物车"
          leftIconType="chevron-left"
          onClickLeftIcon={() => Taro.navigateBack()}
        />
      </View>

      <View
        style={{
          paddingTop: addToNavBarHeight,
          height: `calc(100vh - ${addToNavBarHeight}px - ${addToCartBarHeight}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: isCartEmpty ? "center" : "flex-start",
          justifyContent: isCartEmpty ? "center" : "flex-start",
        }}
      >
        {isCartEmpty ? (
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AtIcon value="shopping-cart" size="60" color="#ccc" />
            <Text>Woops, 购物车为空了!</Text>
          </View>
        ) : (
          <ScrollView
            scrollY
            style={{
              height: `calc(100vh - ${addToNavBarHeight}px - ${addToCartBarHeight}px)`,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
              }}
            >
              {cart.map((product) => (
                <View key={product.id} style={{ marginBottom: "10px" }}>
                  <AtCard
                    note={"颜色：" + product.color + " 尺码：" + product.size}
                    extra={product.price}
                    title={product.title}
                  >
                    <Text style={{ fontSize: "16px", fontWeight: "50px" }}>
                      {product.vendor}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: "100px", height: "100px" }}
                        src={product.imageUrl}
                      />
                      <AtInputNumber
                        min={product.min}
                        max={product.max}
                        step={product.step}
                        value={product.value}
                        onChange={(newValue) => {
                          console.log("newValue : ", newValue);

                          handleQuantityChange(product.id, newValue);
                          console.log("product.value : ", product.value);
                        }}
                      />
                    </View>
                  </AtCard>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Cart Bar */}
      <View
        id="cart-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom:
            systemInfo.screenHeight - systemInfo.safeArea.bottom + "px",
          backgroundColor: "#94bbe9",
          zIndex: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#94bbe9", // 根据你的需求设置背景色
            padding: "20px 20px 0px 20px",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, marginRight: 10 }}>
              Total Price: {calculateTotalPrice()}
            </Text>
          </View>
          <AtButton
            disabled={isCartEmpty}
            type="primary"
            circle
            onClick={() => {
              console.log("add to cart");
              Taro.redirectTo({
                url: "/pages/client/confirmOrder/ConfirmOrder",
              });
            }}
          >
            确认订单
          </AtButton>
        </View>
      </View>
    </View>
  );
}

export default ShopCart;
