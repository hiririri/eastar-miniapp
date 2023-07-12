import { View } from "@tarojs/components";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import BrandCard from "../../../components/brandCard/BrandCard";
import Valentino from "../../../assets/images/valentino.jpg";
import Auth from "../../auth/Auth";

const brandList = [
  {
    id: 1,
    name: "Valentino",
    img: Valentino,
  },
  {
    id: 2,
    name: "Valentino",
    img: Valentino,
  },
  {
    id: 3,
    name: "Valentino",
    img: Valentino,
  },
  {
    id: 4,
    name: "Valentino",
    img: Valentino,
  },
  {
    id: 5,
    name: "Valentino",
    img: Valentino,
  },
  {
    id: 6,
    name: "Valentino",
    img: Valentino,
  },
  {
    id: 7,
    name: "Valentino",
    img: Valentino,
  },
  {
    id: 8,
    name: "Valentino",
    img: Valentino,
  },
];

const StoreSearch = () => {
  const systemInfo = useSelector((state) => state.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");

  return (
    <View>
      <View style={{ position: "relative" }}>
        <NavBar title="门店寻货" />
      </View>

      <View style={{ paddingTop: navBarHeight + "px" }}>
        <View style={{ padding: "5px" }}>
          {brandList.map((brand) => (
            <BrandCard
              title={brand.name}
              img={brand.img}
              handleClick={() => {
                console.log("id: " + brand.id + " clicked !");
                Taro.navigateTo({
                  url: "/pages/client/product-list/ProductList?title=" + brand.name,
                });
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Auth(StoreSearch);
