import Taro from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Product.scss";
import CartBar from "../../../components/cartbar/CartBar";
import ProductInfoCard from "../../../components/productInfoCard/ProductInfoCard";
import NavBar from "../../../components/navbar/NavBar";

const Product = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const [isLoading, setIsLoading] = useState(true);
  const isCartBarShow = Taro.getCurrentInstance().router.params.isCartBarShow;

  const [product, setProduct] = useState({
    id: "",
    title: "",
    ref: "",
    color: "",
    size: "",
    vendor: "",
    oldprice: "",
    price: "",
    imageUrl: "",
    min: 0,
    max: 0,
    step: 1,
    value: 1,
  });

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedStock, setSelectedStock] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);
  const [variants, setVariants] = useState([]);

  const [addToCartBarHeight, setAddToCartBarHeight] = useState(0);
  const [addToNavBarHeight, setAddToNavBarHeight] = useState(0);

  useEffect(() => {
    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });

    setTimeout(() => {
      // 隐藏加载提示框
      Taro.hideLoading();
      const query = Taro.createSelectorQuery();
      query
        .select("#cart-bar")
        .boundingClientRect((rect) => {
          setAddToCartBarHeight(rect.height);
          console.log("cart bar : ", rect.height);
        })
        .exec();
      query
        .select("#nav-bar")
        .boundingClientRect((rect) => {
          setAddToNavBarHeight(rect.height);
          console.log("nav-bar : ", rect.height);
        })
        .exec();

      const productInfo = Taro.getCurrentInstance().router.params.productInfo;

      const parsedProduct = JSON.parse(decodeURIComponent(productInfo));
      const { id, title, image, vendor, oldprice, price, variants, ref } =
        parsedProduct;

      setProduct({
        ...product,
        id: id,
        title: title,
        ref: ref,
        imageUrl: image,
        vendor: vendor,
        oldprice: oldprice,
        price: price,
      });

      setVariants(variants);

      setIsLoading(false);
    }, 1000);
  }, []);

  async function addProductToCart() {
    try {
      const storageInfo = await Taro.getStorageInfo();

      let cart;
      if (storageInfo.keys.indexOf("cart") !== -1) {
        const res = await Taro.getStorage({ key: "cart" });
        cart = res.data;
      } else {
        cart = [];
      }

      cart.push(product);
      await Taro.setStorage({ key: "cart", data: cart });
    } catch (error) {
      console.log(error);
    }

    setCartAdded(true);
  }

  const handleQuantityChange = (value) => {
    if (value === 0) {
      setSelectedOptionIndex(null); // 选择数量为0时，取消选择
      setSelectedStock(0);
    }
    setProduct({ ...product, value: value });
  };

  console.log("product : ", product);

  const sizeOptions = variants.map((variant) => ({
    size: variant.size,
    color: variant.color,
    stock: variant.stock,
  }));

  return (
    <View style={{ flex: 1 }}>
      <NavBar systemInfo={systemInfo} title={product.title} />
      <ScrollView
        scrollY
        style={{
          paddingTop: addToNavBarHeight,
          paddingBottom: addToCartBarHeight,
        }}
      >
        {!isLoading && (
          <Image
            src={product.imageUrl}
            mode="aspectFit"
            style={{ width: "100%", height: "300px" }}
          />
        )}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AtIcon
            value="chevron-left"
            size="30"
            color="#fff"
            onClick={() => Taro.navigateBack()}
          ></AtIcon>
          <View style={{ flex: 1 }} />
          <AtIcon value="heart" size="30" color="#fff"></AtIcon>
          <AtIcon value="shopping-cart" size="30" color="#fff"></AtIcon>
        </View>

        <ProductInfoCard
          product={product}
          sizeOptions={sizeOptions}
          selectedOptionIndex={selectedOptionIndex}
          setSelectedOptionIndex={setSelectedOptionIndex}
          setSelectedStock={setSelectedStock}
          setProduct={setProduct}
        />
      </ScrollView>
      {/* Cart Bar */}
      <CartBar
        addProductToCart={addProductToCart}
        handleQuantityChange={handleQuantityChange}
        selectedStock={selectedStock}
        selectedOptionIndex={selectedOptionIndex}
        product={product}
        cartAdded={cartAdded}
        setCartAdded={setCartAdded}
        systemInfo={systemInfo}
        isCartBarShow={isCartBarShow}
      />
    </View>
  );
};

export default Product;
