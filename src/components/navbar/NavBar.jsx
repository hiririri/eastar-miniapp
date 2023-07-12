import { View } from "@tarojs/components";
import React from "react";
import { AtNavBar } from "taro-ui";
import Taro from "@tarojs/taro";
import "./NavBar.scss";

const NavBar = (props) => {
  const { systemInfo, title, root, setShow } = props;
  return (
    <View
      id="nav-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: systemInfo?.safeArea?.top
          ? systemInfo.safeArea.top + "px"
          : "48px",
        backgroundColor: "#94bbe9",
        zIndex: 1,
      }}
    >
      <AtNavBar
        border={false}
        className="nav-bar"
        title={title}
        leftIconType={root ? "bullet-list" : "chevron-left"}
        onClickLeftIcon={root ? () => setShow(true) : () => Taro.navigateBack()}
      />
    </View>
  );
};

export default NavBar;
