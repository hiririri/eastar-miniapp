import Taro from "@tarojs/taro";
import React from "react";
import { View, Text } from "@tarojs/components";
import { Image } from "@tarojs/components";
import { useSelector } from "react-redux";

const ProductCard = (props) => {
  const { product, isCartBarShow } = props;
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%", // subtract the desired gap
        height: "auto",
        backgroundColor: "#f2f2f2",
        border: "1px solid #eeeeee",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        marginBottom: "20px", // add a bottom margin as gap
      }}
      onClick={() => {
        let productInfo = JSON.stringify(product);
        console.log(productInfo);
        Taro.navigateTo({
          url: `/pages/client/product/Product?productInfo=${encodeURIComponent(
            productInfo
          )}&isCartBarShow=${isCartBarShow}`,
        });
      }}
    >
      <View
        key={product.id}
        className="productItem"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <Image
          src={product.image}
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </View>
      <View
        style={{
          padding: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text>{product.title}</Text>
        <Text style={{ wordWrap: "break-word" }}>{product.ref}</Text>
        <Text>{product.vendor}</Text>

        {isCartBarShow && isLogin && (
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: "line-through",
                color: "#d3d3d3",
              }}
            >
              {product.oldprice}€
            </Text>
            <Text style={{ fontSize: 16 }}>{product.price}€</Text>
          </View>
        )}

        {!isCartBarShow &&
          isLogin && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                欧洲价格：{product.officePrice}€
              </Text>
              <Text style={{ fontSize: 16 }}>
                亚洲价格：{product.asiaPrice}￥
              </Text>
            </View>
          )}
      </View>
    </View>
  );
};

export default ProductCard;
