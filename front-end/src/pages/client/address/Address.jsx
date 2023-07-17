import { View, Text } from "@tarojs/components";
import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import Taro from "@tarojs/taro";
import { AtTextarea, AtInput, AtButton } from "taro-ui";
import { useSelector } from "react-redux";

const Address = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [edit, setEdit] = useState(false); // 是否编辑

  return (
    <View>
      <NavBar title="我的地址" />
      <View style={{ paddingTop: navBarHeight + "px" }}>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e5e5e5",
            borderRadius: "15px",
            padding: "5px",
            margin: "10px",
          }}
        >
          <Text>发货地址</Text>
          <AtInput
            disabled={!edit}
            name="name"
            title="收货人"
            type="text"
            placeholder="请输入收货人姓名"
            value={name}
            onChange={(value) => setName(value)}
          />
          <AtInput
            disabled={!edit}
            name="phone"
            title="手机号码"
            type="phone"
            placeholder="请输入手机号码"
            value={phone}
            onChange={(value) => setPhone(value)}
          />
          <AtInput
            disabled={!edit}
            name="address"
            title="所在地区"
            type="text"
            placeholder="请选择所在地区"
            value={address}
            onChange={(value) => setAddress(value)}
          />
          <AtTextarea
            disabled={!edit}
            count={true}
            value={detailAddress}
            onChange={(value) => setDetailAddress(value)}
            maxLength={200}
            placeholder="请输入详细地址"
            placeholderStyle="background:#fff;width:100%;min-height:80px;padding:0 30rpx;"
          />
        </View>

        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e5e5e5",
            borderRadius: "15px",
            padding: "5px",
            margin: "10px",
          }}
        >
          <Text>发票地址</Text>
          <AtInput
            disabled={!edit}
            name="name"
            title="收货人"
            type="text"
            placeholder="请输入收货人姓名"
            value={name}
            onChange={(value) => setName(value)}
          />
          <AtInput
            disabled={!edit}
            name="phone"
            title="手机号码"
            type="phone"
            placeholder="请输入手机号码"
            value={phone}
            onChange={(value) => setPhone(value)}
          />
          <AtInput
            disabled={!edit}
            name="address"
            title="所在地区"
            type="text"
            placeholder="请选择所在地区"
            value={address}
            onChange={(value) => setAddress(value)}
          />
          <AtTextarea
            disabled={!edit}
            count={true}
            value={detailAddress}
            onChange={(value) => setDetailAddress(value)}
            maxLength={200}
            placeholder="请输入详细地址"
            placeholderStyle="background:#fff;width:100%;min-height:80px;padding:0 30rpx;"
          />
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
              type="secondary"
              circle
              onClick={() => {
                console.log("编辑");
                setEdit(true);
              }}
            >
              编辑
            </AtButton>
            <AtButton
              type="primary"
              circle
              onClick={() => {
                console.log("保存");
                setEdit(false);
              }}
            >
              保存
            </AtButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Address;
