export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/login/Login",
    "pages/client/root/Root",
    "pages/client/product/Product",
    "pages/client/register/Register",
    "pages/client/shop-cart/ShopCart",
    "pages/client/confirmOrder/ConfirmOrder",
    "pages/client/store-map/StoreMap",
    "pages/client/store/Store",
    "pages/client/store-search/StoreSearch",
    "pages/client/product-list/ProductList",
    "pages/client/address/Address",
    "pages/client/changePassword/ChangePassword",
    "pages/client/order-list/OrderList",
    "pages/client/news/News",
    "pages/business/root/Root",
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle:'custom'
  },
  lazyCodeLoading: 'requiredComponents',
})
