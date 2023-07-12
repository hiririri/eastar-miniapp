import Taro from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import { AtButton, AtInput, AtNavBar } from "taro-ui";
import { useState, useEffect } from "react";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../app/userSlice.js";

import NavBar from "../../components/navbar/NavBar";

function Login() {
  const role = Taro.getStorageSync("role");
  const dispatch = useDispatch();

  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleAccountInput = (value) => {
    setAccount(value);
  };

  const handlePasswordInput = (value) => {
    setPassword(value);
  };

  const handleClientLogin = () => {
    if (account === "login" && password === "login") {
      // 验证成功，跳转到Homepage页面
      dispatch(logIn(true));
      Taro.redirectTo({ url: "/pages/client/root/Root" });
    } else {
      // 验证失败，可以根据需要进行错误提示
      console.log("账号或密码错误");
      Taro.showToast({
        title: "账号或密码错误",
        icon: "none",
        duration: 1000,
      });
    }
  };

  const handleBusinessLogin = () => {
    if (account === "login" && password === "login") {
      // 验证成功，跳转到Homepage页面
      Taro.redirectTo({ url: "/pages/business/root/Root" });
      console.log("跳转至商家主页");
    } else {
      // 验证失败，可以根据需要进行错误提示
      console.log("账号或密码错误");
      Taro.showToast({
        title: "账号或密码错误",
        icon: "none",
        duration: 1000,
      });
    }
  };

  const handleLogin = () => {
    switch (role) {
      case "client":
        handleClientLogin();
        break;
      case "business":
        handleBusinessLogin();
        break;
    }
    
  };

  const handleRegister = () => {
    Taro.navigateTo({ url: "/pages/client/register/Register" });
  };

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query
      .select("#nav-bar")
      .boundingClientRect((rect) => {
        Taro.setStorageSync("navBarHeight", rect.height);
      })
      .exec();

    const apikey = "e0d1343dca05e657bf07e2c00637891b";
    const apisecret = "5995d972b50af8af5fbcd43e8081da5d";
    const acces_token = "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";
  }, []);

  const navBarHeight = Taro.getStorageSync("navBarHeight");
  console.log("navBarHeight: ", navBarHeight);

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="登录" />

      <View
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: navBarHeight + "px",
          height: systemInfo?.screenHeight - navBarHeight + "px",
          background: "rgb(238,174,202)",
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(149,188,233) 100%)",
        }}
      >
        <View className="account">
          <View className="textContainer">
            <View className="vertical-line" />
            <Text className="account-text">账号</Text>
          </View>
          <AtInput
            className="custom-input"
            name="account"
            type="text"
            placeholder="手机号"
            placeholderStyle="color:#999999;"
            value={account}
            onChange={handleAccountInput}
          />
        </View>
        <View className="account">
          <View className="textContainer">
            <View className="vertical-line" />
            <Text className="account-text">密码</Text>
          </View>
          <AtInput
            className="custom-input"
            name="password"
            type="password"
            placeholder="请输入密码"
            placeholderStyle="color:#999999;"
            value={password}
            onChange={handlePasswordInput}
            password
          />
          <Input disabled />
        </View>
        <View className="buttonContainer">
          <AtButton
            className="loginButton"
            size="50"
            type="primary"
            onClick={handleLogin}
          >
            登录
          </AtButton>
          {role === "client" ? (
            <AtButton
              className="registerButton"
              size="50"
              type="secondary"
              onClick={handleRegister}
            >
              注册
            </AtButton>
          ) : (
            <AtButton
              className="registerButton"
              size="50"
              type="secondary"
              onClick={()=>{
                Taro.redirectTo({ url: "/pages/index/index" });
              }}
            >
              返回
            </AtButton>
          )}
        </View>
      </View>
    </View>
  );
}

export default Login;
