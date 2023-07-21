import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtInputNumber, AtBadge, AtFab } from "taro-ui";
import { useSelector } from "react-redux";

const CartBar = (props) => {
  const {
    addProductToCart,
    handleQuantityChange,
    selectedStock,
    selectedOptionIndex,
    product,
    cartAdded,
    setCartAdded,
    systemInfo,
    isCartBarShow,
  } = props;

  console.log("isCartBarShow : ", isCartBarShow);
  const show = isCartBarShow === "true" ? true : false;
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <View
      id="cart-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom:
          systemInfo.screenHeight - systemInfo.safeArea.bottom + "px",
        backgroundColor: "#94bbe9",
        zIndex: 1,
      }}
    >
      {show && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#94bbe9",
            padding: "15px 15px 0px 15px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AtInputNumber
              className="input-number"
              min={0}
              max={selectedStock}
              step={1}
              value={product.value}
              onChange={handleQuantityChange}
            />
            <AtBadge dot={cartAdded}>
              <AtFab
                className="fab"
                onClick={() => {
                  setCartAdded(false);
                  Taro.navigateTo({ url: "/pages/client/shop-cart/ShopCart" });
                }}
              >
                <Text className="at-fab__icon at-icon at-icon-shopping-cart icon"></Text>
              </AtFab>
            </AtBadge>
          </View>
          <View>
            <AtButton
              type="primary"
              circle
              disabled={selectedOptionIndex === null}
              onClick={addProductToCart}
            >
              加入购物车
            </AtButton>
          </View>
        </View>
      )}

      {!show && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#94bbe9",
            padding: "15px 15px 0px 15px",
          }}
        >
          <AtButton type="primary" circle onClick={()=>{
            if (isLogin) {
              console.log("联系商家寻货");
            } else {
              Taro.redirectTo({ url: "/pages/login/Login" });
            }
          }}>
            联系商家寻货
          </AtButton>
        </View>
      )}
    </View>
  );
};

export default CartBar;
