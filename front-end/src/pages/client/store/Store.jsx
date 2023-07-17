import Taro from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AtNavBar, AtCard } from "taro-ui";
import "./Store.scss";
import NavBar from "../../../components/navbar/NavBar";

const Store = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [addToNavBarHeight, setAddToNavBarHeight] = useState(0);

  const storeInfo  = Taro.getCurrentInstance().router.params.storeInfo;
  const store = JSON.parse(decodeURIComponent(storeInfo));

  console.log("store : ", store);

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
        .select("#nav-bar")
        .boundingClientRect((rect) => {
          setAddToNavBarHeight(rect.height);
          console.log("nav-bar : ", rect.height);
        })
        .exec();

      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavBar systemInfo={systemInfo} title="店铺详情" />

      <ScrollView
        scrollY
        style={{
          paddingTop: addToNavBarHeight,
        }}
      >
        {!isLoading && (
          <View className="store-detail">
            <Image
              className="store-image"
              src={store.image}
              mode="aspectFill"
            />
            <View className="store-info">
              <View className="store-info-item">
                <Text className="store-info-item-title">{store.title}</Text>
              </View>
              <View className="store-info-item">
                <Text className="store-info-item-text">店铺地址</Text>
                <Text className="store-info-item-value">{store.address}</Text>
              </View>
              <View className="store-info-item">
                <Text className="store-info-item-text">联系电话</Text>
                <Text className="store-info-item-value">{store.phone}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Store;
