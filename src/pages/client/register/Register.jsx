import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { View, RadioGroup, Radio } from "@tarojs/components";
import { AtInput, AtButton, AtNavBar, AtRadio } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import "./Register.scss";
import NavBar from "../../../components/navbar/NavBar";

function Register() {
  // 获取dispatch函数，可以用来调度actions
  const dispatch = useDispatch();

  // 使用useSelector来从Redux store中获取state
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [types, setTypes] = useState([]);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("密码和确认密码不匹配！");
      return;
    }

    // 这里可以添加注册逻辑，例如发送请求到后端API
    console.log("注册信息：", { username, phone, email, password, types });

    // 注册成功后，跳转到登录页面
    Taro.navigateBack();
  };

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="注册" />

      <View style={{ paddingTop: systemInfo.navBarHeight + "px" }}>
        <View className="card">
          <AtRadio
            options={[
              { label: "男生", value: "man" },
              { label: "女生", value: "woman" },
            ]}
            value={types}
            onClick={(value) => setTypes(value)}
          />
        </View>
        <View className="card">
          <AtInput
            title="姓名"
            name="姓名"
            type="text"
            placeholder="姓名"
            value={username}
            onChange={(value) => setUsername(value)}
          />
        </View>
        <View className="card">
          <AtInput
            title="电话"
            name="电话"
            type="text"
            placeholder="电话"
            value={phone}
            onChange={(value) => setPhone(value)}
          />
        </View>
        <View className="card">
          <AtInput
            title="邮箱"  
            name="邮箱"
            type="text"
            placeholder="邮箱"
            value={email}
            onChange={(value) => setEmail(value)}
          />
        </View>
        <View className="card">
          <AtInput
            title="密码"
            name="密码"
            type="password"
            placeholder="密码"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </View>
        <View className="card">
          <AtInput
            title="确认密码"
            name="确认密码"
            type="password"
            placeholder="确认密码"
            value={confirmPassword}
            onChange={(value) => setConfirmPassword(value)}
          />
        </View>
        <AtButton className="register-button" onClick={handleRegister}>
          注册
        </AtButton>
      </View>
    </View>
  );
}

export default Register;
