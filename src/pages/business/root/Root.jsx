import { View, Text } from "@tarojs/components";
import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import Taro from "@tarojs/taro";
import { AtTabBar } from "taro-ui";
import { useSelector } from "react-redux";
import OrderMessage from "../subPages/orderMessage/OrderMessage";
import User from "../subPages/user/User";

const tabList = [
  { title: "寻货消息", iconType: "bell" },
  { title: "我的", iconType: "user" },
];

const Root = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const tabBarHeight = Taro.getStorageSync("tabBarHeight");
  const [currentTab, setCurrentTab] = React.useState(0);

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return <OrderMessage />;
      case 1:
        return <User />;
    }
  };

  const getCurrentTabTitle = () => {
    return tabList[currentTab].title;
  };

  return (
    <View>
      <NavBar
        systemInfo={systemInfo}
        title={getCurrentTabTitle()}
        root={true}
      />
      <View style={{ paddingTop: navBarHeight + "px" }}>{renderContent()}</View>
      {/* Tab Bar */}
      <View
        id="tabBar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom:
            systemInfo.screenHeight - systemInfo.safeArea.bottom + "px",
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      >
        <AtTabBar
          tabList={tabList.map((item) => ({
            title: item.title,
            iconType: item.iconType,
          }))}
          onClick={(value) => setCurrentTab(value)}
          current={currentTab}
        />
      </View>
    </View>
  );
};

export default Root;
