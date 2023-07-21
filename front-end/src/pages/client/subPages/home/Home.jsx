import React from "react";
import Taro from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtGrid, AtNoticebar } from "taro-ui";
import "./Home.scss";

function Home({ handleTabClick, handleTopTap }) {
  const imageList = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFByUA1A55zEGSQCql_EcXUcjVOVrmlIusg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOYrJX6-dQHlornCwVZL-M5m4R05FvsLIqfA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABm67AFy5Mjbwlg0fqFiV5k0cvou-Fgx_MA&usqp=CAU",
  ];
  return (
    <View>
      <View className="container">
        <Swiper
          className="image-swiper"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
          interval={2000}
        >
          {imageList.map((imageUrl, index) => (
            <SwiperItem key={index}>
              <Image src={imageUrl} className="swiper-image" />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className="notice-bar">
        <AtNoticebar marquee>
          这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
        </AtNoticebar>
      </View>

      <AtGrid
        columnNum={3}
        data={[
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
            value: "买手店",
          },
          {
            image:
              "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
            value: "品牌店寻货",
          },
          {
            image:
              "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
            value: "实时新闻",
          },
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
            value: "寻价",
          },
          {
            image:
              "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
            value: "门店地图",
          },
          {
            image:
              "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
            value: "帮助",
          },
        ]}
        onClick={(item, index) => {
          console.log(item, index);
          switch (index) {
            case 0:
              console.log("跳转到买手店");
              Taro.navigateTo({
                url: "/pages/client/shopping/Shopping",
              });
              break;
            case 1:
              console.log("跳转到品牌店寻货");
              Taro.navigateTo({
                url: "/pages/client/product-list/ProductList?title=品牌店寻货",
              });
              break;
            case 2:
              console.log("跳转到实时新闻");
              Taro.navigateTo({
                url: "/pages/client/news/News",
              });
              break;
            case 3:
              console.log("跳转到寻价");
              Taro.navigateTo({
                url: "/pages/client/product-list/ProductList?title=寻价",
              });
              break;
            case 4: 
              // handleTabClick(1);
              // handleTopTap(1);
              console.log("跳转到地图");
              Taro.navigateTo({
                url: "/pages/client/store-map/StoreMap",
              });
              break;
            case 5:
              console.log("跳转到帮助");
              Taro.navigateTo({
                url: "/pages/client/help/Help",
              });
              break;
            default:
              break;
          }
        }}
      />
    </View>
  );
}

export default Home;
