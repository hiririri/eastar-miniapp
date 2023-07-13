import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabBar, AtNavBar, AtActivityIndicator } from "taro-ui";
import { useEffect, useState, Suspense } from "react";
import Home from "../subPages/home/Home";
import Cart from "../subPages/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import "./Root.scss";
import User from "../subPages/user/User";
import CustomDrawer from "../../../components/customDrawer/CustomDrawer";
import NavBar from "../../../components/navbar/NavBar";
import Message from "../subPages/message/Message";
import { setSystemInfo } from "../../../app/systemInfoSlice.js";
import { getSystemInfo } from "../../utils/util";

const tabList = [
  { title: "首页", iconType: "home" },
  { title: "购物车", iconType: "shopping-cart" },
  { title: "寻货消息", iconType: "bell" },
  { title: "我的", iconType: "user" },
];

function Root() {
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

  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const tabBarHeight = Taro.getStorageSync("tabBarHeight");
  // console.log("Root is rendering");

  const [isLoading, setIsLoading] = useState(true);

  const [shoppingCurrentTopTab, setShoppingCurrentTopTab] = useState(0);

  useEffect(() => {
    // 显示加载提示框
    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });

    // 模拟数据加载
    setTimeout(() => {
      // 隐藏加载提示框
      Taro.hideLoading();

      const query = Taro.createSelectorQuery();
      query
        .select("#tabBar")
        .boundingClientRect((rect) => {
          Taro.setStorageSync("tabBarHeight", rect.height);
        })
        .exec();

      setIsLoading(false); // 这里模拟加载完成，实际使用时你可能需要根据数据加载的结果来设置
    }, 1000); // 这里模拟2秒的加载时间
  }, []);

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  const handleTopTap = (index) => {
    setShoppingCurrentTopTab(index);
  };

  const handleTabChange = () => {
    // 根据选中的选项进行相应的操作
    switch (currentTab) {
      case 0:
        // 首页操作
        return (
          <Home handleTabClick={handleTabClick} handleTopTap={handleTopTap} />
        );
      case 1:
        // 购买操作
        return <Cart />;
      case 2:
        // 订单信息
        return <Message />;
      case 3:
        // 我的操作
        return <User />;
      default:
        break;
    }
  };

  const getCurrentTabTitle = () => {
    return tabList[currentTab].title;
  };

  const [show, setShow] = useState(false);

  console.log("tabBarHeight", Taro.getStorageSync("tabBarHeight"));
  console.log("navBarHeight: ", navBarHeight);

  return (
    <Suspense fallback={<AtActivityIndicator mode="center" />}>
      {systemInfo && (
        <View style={{ position: "relative" }}>
          <CustomDrawer
            isOpen={show}
            setIsOpen={setShow}
            itemList={["购物车", "会员"]}
          />
          <View
            style={{
              pointerEvents: show ? "none" : "auto",
            }}
          >
            {/* NavBar */}
            <NavBar
              systemInfo={systemInfo}
              title={getCurrentTabTitle()}
              root={true}
              setShow={setShow}
            />

            {/* Main Contain */}
            <View style={{ paddingTop: navBarHeight + "px" }}>
              {handleTabChange()}
            </View>

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
                onClick={handleTabClick}
                current={currentTab}
              />
            </View>
          </View>
        </View>
      )}
    </Suspense>
  );
}

export default Root;
