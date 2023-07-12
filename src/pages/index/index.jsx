import { View, Text } from "@tarojs/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSystemInfo } from "../../app/systemInfoSlice.js";
import { getSystemInfo } from "../utils/util";
import Taro from "@tarojs/taro";
import { AtButton, AtNavBar, AtRadio, AtRadioItem } from "taro-ui";
import "./index.scss";
import { useState } from "react";

function Index() {
  const dispatch = useDispatch();

  // 使用useSelector来从Redux store中获取state
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);

  // console.log("Root is rendering");
  useEffect(() => {
    // console.log('useEffect is being called');
    const fetchSystemInfo = async () => {
      try {
        const systemInfo = await getSystemInfo();
        // console.log("getSystemInfo 返回的结果是：", systemInfo);
        dispatch(setSystemInfo(systemInfo));
        // console.log("setSystemInfo 被调用了，参数是：", systemInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSystemInfo();
  }, [dispatch]);

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query
      .select("#nav-bar")
      .boundingClientRect((rect) => {
        Taro.setStorageSync("navBarHeight", rect.height);
      })
      .exec();
  }, []);

  const navBarHeight = Taro.getStorageSync("navBarHeight");

  const [role, setRole] = useState("business");

  return (
    <View>
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
        <AtNavBar border={false} className="nav-bar" title="选择角色" />
      </View>
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
        <View
          id="select"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AtRadio
            className="radio"
            circle
            options={[
              { label: "商家", value: "business" },
              { label: "客户", value: "client" },
            ]}
            value={role}
            onClick={(value) => setRole(value)}
          />
          <View
            style={{
              marginTop: "20px", // 这里可以根据实际需要调整
            }}
          >
            <AtButton circle type="primary" onClick={()=>{
              Taro.setStorageSync("role", role);
              switch (role) {
                case "business":
                  Taro.redirectTo({
                    url: "/pages/login/Login",
                  });
                  break;
                case "client":
                  Taro.redirectTo({
                    url: "/pages/client/root/Root",
                  });
                  break;
              }
            }}>
              <Text>确定</Text>
            </AtButton>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Index;
