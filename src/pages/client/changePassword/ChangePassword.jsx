import { View, Text } from "@tarojs/components";
import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import Taro from "@tarojs/taro";
import { useSelector } from "react-redux";
import { AtInput, AtButton } from "taro-ui";

const ChangePassword = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View>
      <NavBar title="修改密码" />
      <View style={{ paddingTop: navBarHeight + "px" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e5e5e5",
            borderRadius: "15px",
            padding: "5px",
            margin: "10px",
          }}
        >
          <AtInput
            name="oldPassword"
            title="旧密码"
            type="password"
            placeholder="请输入旧密码"
            value={oldPassword}
            onChange={(value) => {
              setOldPassword(value);
            }}
          />
          <AtInput
            name="newPassword"
            title="新密码"
            type="password"
            placeholder="请输入新密码"
            value={newPassword}
            onChange={(value) => {
              setNewPassword(value);
            }}
          />
          <AtInput
            name="confirmPassword"
            title="确认密码"
            type="password"
            placeholder="请再次输入新密码"
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
            }}
          />
        </View>
      </View>

      {/* 底部按钮 */}
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
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // 根据你的需求设置背景色
            padding: "20px 20px 0px 20px",
          }}
        >
          <AtButton
            type="primary"
            circle
            onClick={() => {
              if (oldPassword === "") {
                Taro.showToast({
                  title: "旧密码不能为空",
                  icon: "none",
                });
                return;
              }
              if (newPassword === "") {
                Taro.showToast({
                  title: "新密码不能为空",
                  icon: "none",
                });
                return;
              }
              if (confirmPassword === "") {
                Taro.showToast({
                  title: "确认密码不能为空",
                  icon: "none",
                });
                return;
              }
              if (newPassword !== confirmPassword) {
                Taro.showToast({
                  title: "两次密码不一致",
                  icon: "none",
                });
                return;
              }
              console.log("保存");
              Taro.navigateBack();
            }}
          >
            保存更改
          </AtButton>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
