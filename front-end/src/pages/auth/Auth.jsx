import Taro from "@tarojs/taro";
import { useSelector } from "react-redux";

export default function Auth(WrappedComponent) {
  return function (props) {
    const isLogin = useSelector((state) => state.user.isLogin);
    console.log("isLogin : ", isLogin);
    if (!isLogin) {
      Taro.redirectTo({ url: "/pages/login/Login" });

      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
}
