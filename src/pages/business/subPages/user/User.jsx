import { View, Text, Button } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalAction,
} from "taro-ui";
import { useSelector, useDispatch } from "react-redux";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { logOut } from "../../../../app/userSlice";

function User() {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);
  const userInfo = {
    username: "User Name",
  };

  const handleLogout = () => {
    dispatch(logOut());
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  };

  return (
    <View>
      {/* User Info Section */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          padding: "24px",
          backgroundColor: "#eee",
        }}
      >
        <View style={{ marginRight: "auto" }}>
          <View style={{ marginLeft: "12px" }}>
            <Text
              style={{
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {userInfo.username}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f8f8f8",
        }}
      >
        <AtList>
          <AtListItem
            title="修改密码"
            arrow="right"
            onClick={() => console.log("Go to Change Password Page")}
          />
          <AtListItem
            title="退出登录"
            arrow="right"
            onClick={() => {
              console.log("Logout");
              setIsOpened(true);
            }}
          />
        </AtList>
      </View>
      <AtModal isOpened={isOpened} closeOnClickOverlay={false}>
        <AtModalHeader>是否退出登录？</AtModalHeader>
        <AtModalAction>
          <Button
            onClick={() => {
              setIsOpened(false);
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              setIsOpened(false);
              handleLogout();
            }}
          >
            确定
          </Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
}

export default User;
