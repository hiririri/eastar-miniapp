import { View, Text } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
import NavBar from "../../../components/navbar/NavBar";
import { useSelector } from "react-redux";

const News = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  console.log(navBarHeight);

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="实时新闻" root={false} setShow={false} />
      <View style={{ paddingTop: navBarHeight + "px" }}>
        <Text>敬请期待...</Text>
      </View>
    </View>
  );
};

export default News;
