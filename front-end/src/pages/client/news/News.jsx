import { View, ScrollView } from "@tarojs/components";
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import NavBar from "../../../components/navbar/NavBar";
import { useSelector } from "react-redux";
import DocsHeader from "../../../components/docsHeader/DocsHeader";
import "./News.scss";
import { AtIcon } from "taro-ui";
import Auth from "../../auth/Auth";

const list = [
  {
    id: 1,
    title: "这是一级标题这是一级标题",
    content:
      "他的风格，就像他的性格一样，既独立又自由。他敢于挑战常规，大胆突破自我，他的每一次尝试都是对个性的一次诠释。他的穿搭风格，就像他的音乐一样，富有力量，充满感染力。檀健次的穿搭，既是他个人品味的展现，也是他对生活的热爱。他用他的穿搭，诠释了什么是真正的时尚：那不仅仅是一种外在的装扮，而是一种生活的态度，一种自我表达的方式。无论是在舞台上，还是在生活中，檀健次都以他的独特风格和无限魅力，引领着我们走向更广阔的时尚世界。他让我们明白，时尚是一种态度，是对自己的热爱，是生活中的小确幸。",
  },
  {
    id: 2,
    title: "这是一级标题这是一级标题",
    content:
      "他的风格，就像他的性格一样，既独立又自由。他敢于挑战常规，大胆突破自我，他的每一次尝试都是对个性的一次诠释。他的穿搭风格，就像他的音乐一样，富有力量，充满感染力。檀健次的穿搭，既是他个人品味的展现，也是他对生活的热爱。他用他的穿搭，诠释了什么是真正的时尚：那不仅仅是一种外在的装扮，而是一种生活的态度，一种自我表达的方式。无论是在舞台上，还是在生活中，檀健次都以他的独特风格和无限魅力，引领着我们走向更广阔的时尚世界。他让我们明白，时尚是一种态度，是对自己的热爱，是生活中的小确幸。",
  },
  {
    id: 3,
    title: "这是一级标题这是一级标题",
    content:
      "他的风格，就像他的性格一样，既独立又自由。他敢于挑战常规，大胆突破自我，他的每一次尝试都是对个性的一次诠释。他的穿搭风格，就像他的音乐一样，富有力量，充满感染力。檀健次的穿搭，既是他个人品味的展现，也是他对生活的热爱。他用他的穿搭，诠释了什么是真正的时尚：那不仅仅是一种外在的装扮，而是一种生活的态度，一种自我表达的方式。无论是在舞台上，还是在生活中，檀健次都以他的独特风格和无限魅力，引领着我们走向更广阔的时尚世界。他让我们明白，时尚是一种态度，是对自己的热爱，是生活中的小确幸。",
  },
  {
    id: 4,
    title: "这是一级标题这是一级标题",
    content:
      "他的风格，就像他的性格一样，既独立又自由。他敢于挑战常规，大胆突破自我，他的每一次尝试都是对个性的一次诠释。他的穿搭风格，就像他的音乐一样，富有力量，充满感染力。檀健次的穿搭，既是他个人品味的展现，也是他对生活的热爱。他用他的穿搭，诠释了什么是真正的时尚：那不仅仅是一种外在的装扮，而是一种生活的态度，一种自我表达的方式。无论是在舞台上，还是在生活中，檀健次都以他的独特风格和无限魅力，引领着我们走向更广阔的时尚世界。他让我们明白，时尚是一种态度，是对自己的热爱，是生活中的小确幸。",
  },
  {
    id: 5,
    title: "这是一级标题这是一级标题",
    content:
      "欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文",
  },
  {
    id: 5,
    title: "这是一级标题这是一级标题",
    content:
      "欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文",
  },
  {
    id: 5,
    title: "这是一级标题这是一级标题",
    content:
      "欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文",
  },
  {
    id: 5,
    title: "这是一级标题这是一级标题",
    content:
      "欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文",
  },
  {
    id: 5,
    title: "这是一级标题这是一级标题",
    content:
      "欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文",
  },
  {
    id: 5,
    title: "这是一级标题这是一级标题",
    content:
      "欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文欧文",
  },
];

const News = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  console.log(navBarHeight);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // 处理下拉刷新的函数
  const handleRefresh = async () => {
    setIsRefreshing(true);

    // 这里可以放你的刷新新闻列表的逻辑，例如获取最新新闻数据
    console.log("刷新新闻列表");

    setIsRefreshing(false);
  };

  const handleClick = (item) => {
    let article = JSON.stringify(item);
    Taro.navigateTo({
      url: `/pages/client/news-detail/NewsDetail?article=${encodeURIComponent(
        article
      )}`,
    });
  };

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="实时新闻" root={false} />
      <View style={{ paddingTop: navBarHeight + "px" }}>
        <ScrollView
          style={{ height: `calc(100vh-${navBarHeight})` }}
          // 使能下拉刷新
          enablePullDownRefresh
          // 触发刷新时调用的函数
          onPullDownRefresh={handleRefresh}
        >
          {list.map((item) => {
            return (
              <View className="news-card" onClick={() => handleClick(item)}>
                <View className="news-card__text-container">
                  <View className="at-article__h2 news-card__text-container__title">
                    {item.title}
                  </View>
                  <View className="at-article__p news-card__text-container__content">
                    {item.content}
                  </View>
                </View>
                <View className="news-card__icon">
                  <AtIcon value="chevron-right" size="20" color="#000" />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Auth(News);
