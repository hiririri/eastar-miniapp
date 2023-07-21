import { View, Text, ScrollView, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../../components/navbar/NavBar";
import {
  AtList,
  AtListItem,
  AtButton,
  AtCard,
  AtActionSheet,
  AtActionSheetItem,
} from "taro-ui";
import "./ConfirmOrder.scss";

const paymentMethods = ["微信支付", "支付宝支付", "银行卡支付"];

const ConfirmOrder = () => {
  const [cart, setCart] = useState([]);
  const [isActionSheetOpened, setIsActionSheetOpened] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const tabBarHeight = Taro.getStorageSync("tabBarHeight");

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.value;
    }, 0);
  };

  useEffect(() => {
    console.log("confirm order");
    const fetchCart = async () => {
      try {
        const res = await Taro.getStorage({ key: "cart" });
        setCart(res.data);
      } catch (error) {
        Taro.setStorage({ key: "cart", data: [] });
      }
    };
    fetchCart();
  }, []);

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

      console.log("orders : ", JSON.stringify(orders));

      // 创建新订单
      const newOrder = { id: orderId, status: "unpayed", items: cartData };

      // 将新订单添加到已有订单列表
      orders.push(newOrder);

      // 保存订单列表
      await Taro.setStorage({ key: "order", data: orders });

      const res = await Taro.getStorage({ key: "order" });
      console.log("order : ", JSON.stringify(res.data));
    } catch (error) {
      console.error("Could not create order:", error);
    }
  };

  const generateOrderId = () => {
    // 生成订单ID的逻辑，可以使用时间戳、UUID等方法
    // 这里以时间戳为例
    return Date.now().toString();
  };

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="确认订单" root={false} />
      <View
        style={{
          paddingTop: navBarHeight + "px",
          height: `calc(100vh - ${navBarHeight}px - ${tabBarHeight}px)`,
        }}
      >
        <ScrollView
          scrollY
          style={{
            height: `calc(100vh - ${navBarHeight}px - ${tabBarHeight}px)`,
          }}
        >
          {/* 地址 */}
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              border: "1px solid #e5e5e5",
              borderRadius: "15px",
              padding: "5px",
              margin: "10px",
            }}
          >
            <View className="at-article__p">地址：Pl. de l'Opéra, 75009 Paris</View>
            {/* <AtList hasBorder={false} className="list">
              <AtListItem
                arrow="right"
                note="描述信息"
                title="标题文字"
                extraText="详细信息详细信息详细信息详细信息"
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/client/address/Address",
                  });
                }}
              />
            </AtList> */}
          </View>
          {/* 支付方式 */}
          <View
            style={{
              margin: "10px",
            }}
          >
            <AtList hasBorder={false} className="list">
              <AtListItem
                arrow="right"
                title="支付方式"
                note={selectedPaymentMethod}
                extraText="请选择"
                onClick={() => setIsActionSheetOpened(true)}
              />
            </AtList>
          </View>
          {/* 商品信息 */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
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
                    <Text>x{product.value}</Text>
                  </View>
                </AtCard>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* 底部按钮 */}
      <View
        id="tabBar"
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
            type="primary"
            circle
            onClick={() => {
              console.log("checkout");
              createOrder(cart);

              // 跳转到支付页面

              // 关闭当前页面，回到商品页面
              Taro.navigateBack();
            }}
          >
            去支付
          </AtButton>
        </View>
      </View>

      {/* 支付方式选择 */}
      <AtActionSheet
        isOpened={isActionSheetOpened}
        cancelText="取消"
        title="选择支付方式"
        onCancel={() => setIsActionSheetOpened(false)}
        onClose={() => setIsActionSheetOpened(false)}
      >
        {paymentMethods.map((method) => (
          <AtActionSheetItem
            key={method}
            onClick={() => {
              setSelectedPaymentMethod(method);
              setIsActionSheetOpened(false);
            }}
          >
            {method}
          </AtActionSheetItem>
        ))}
      </AtActionSheet>
    </View>
  );
};

export default ConfirmOrder;
