import Taro from '@tarojs/taro';

export default function isLogin(next, app) {
  // 在这里，你可以添加你的登录判断逻辑
  const isUserLoggedIn = Taro.getStorageSync('isUserLoggedIn');
  if (true) {
    // 如果用户已经登录，就继续跳转
    next();
  } else {
    // 如果用户未登录，就跳转到登录页面
    Taro.redirectTo({
      url: '/pages/login/Login'  // 修改为你的登录页面路径
    });
  }
}
