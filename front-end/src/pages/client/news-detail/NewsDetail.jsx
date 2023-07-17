import { View, Text } from "@tarojs/components";
import React from "react";
import DocsHeader from "../../../components/docsHeader/DocsHeader";
import NavBar from "../../../components/navbar/NavBar";
import Taro from "@tarojs/taro";
import { useSelector } from "react-redux";

const NewsDetail = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");

  const article = JSON.parse(
    decodeURIComponent(Taro.getCurrentInstance().router.params.article)
  );

  console.log(article);

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="新闻详情" />
      <View style={{ paddingTop: navBarHeight + "px" }}>
        <DocsHeader title={article.title} />
        <View className="at-article__p">{article.content}</View>
      </View>
    </View>
  );
};

export default NewsDetail;
