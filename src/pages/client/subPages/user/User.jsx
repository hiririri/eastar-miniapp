import { View, Text, Button } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtAvatar,
  AtButton,
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
    avatar:
      "https://designoholic.com/wp-content/uploads/2017/07/avatar-colored-d.png", // 假设这是头像的 URL
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
        {isLogin && (
          <View style={{ marginRight: "auto" }}>
            <AtAvatar circle image={userInfo.avatar} size="large"></AtAvatar>
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
        )}
        {!isLogin && (
          <View style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <AtButton
              type="primary"
              size="small"
              circle
              onClick={() => {
                Taro.redirectTo({
                  url: "/pages/login/Login",
                });
              }}
            >
              登录
            </AtButton>
            <AtButton
              type="primary"
              size="small"
              circle
              onClick={() => {
                Taro.redirectTo({
                  url: "/pages/index/index",
                });
              }}
            >
              返回
            </AtButton>
          </View>
        )}
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
            disabled={!isLogin}
            title="修改密码"
            arrow="right"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/client/changePassword/ChangePassword",
              });
            }}
          />
          <AtListItem
            disabled={!isLogin}
            title="我的订单"
            arrow="right"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/client/order-list/OrderList",
              });
            }}
          />
          <AtListItem
            disabled={!isLogin}
            title="我的地址"
            arrow="right"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/client/address/Address",
              });
            }}
          />
          <AtListItem
            disabled={!isLogin}
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
        <AtModalHeader>否退出登录？
        </AtModalHeader>
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
