import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import { View } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";

function CustomDrawer({ isOpen, setIsOpen, itemList }) {
  const dispatch = useDispatch();

  // 使用useSelector来从Redux store中获取state
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log("Login status is: ", isLogin);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index) => {
    handleToggle();
    switch (index) {
      case 0:
        Taro.navigateTo({url: '/pages/client/shop-cart/ShopCart'}); // 跳转到搜索页面
        break;
      case 1:
        break;
    }
  };

  return (
    <View>
      {/* Overlay */}
      <View
        onClick={handleToggle}
        style={{
          display: isOpen ? "block" : "none",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          transition: "0.3s ease",
        }}
      />

      {/* Drawer */}
      <View
        style={{
          position: "fixed",
          zIndex: 100,
          top: 0,
          bottom: 0,
          left: 0,
          width: "250px",
          paddingTop: systemInfo.safeArea.top + "px",
          backgroundColor: "#FFF",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "0.3s ease",
        }}
      >
        {/* Your menu items go here */}
        <AtList>
          {itemList.map((item, index) => (
            <AtListItem key={index} title={item} onClick={() => handleItemClick(index)} />
          ))}
        </AtList>
      </View>
    </View>
  );
}

export default CustomDrawer;
