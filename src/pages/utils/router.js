import Taro from "@tarojs/taro";
import { useRouter, Route, useRouterGuard } from "@tarojs/router";

// 定义需要进行路由守卫的页面
const pagesWithGuard = ["/pages/store-map/StoreMap"];

// 路由拦截逻辑
function routeGuard(to) {
  const isLoggedIn = false; // 替换为你的登录状态逻辑

  if (pagesWithGuard.includes(to.path)) {
    if (!isLoggedIn) {
      Taro.redirectTo({
        url: "/pages/login/Login",
      });
      return false;
    }
  }

  return true;
}

// 路由配置
const routerConfig = [
  {
    path: "/pages/home/index",
    component: "Home",
  },
  {
    path: "/pages/login/index",
    component: "Login",
  },
];

// 注册路由
routerConfig.forEach((route) => {
  Route({
    ...route,
    component: require(`./pages/${route.component}`).default,
  });
});

// 注册导航守卫
useRouterGuard((to) => {
  return routeGuard(to);
});

// 导出路由器
export default useRouter;
