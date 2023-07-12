import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView, GridView } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtSearchBar } from "taro-ui";
import { useSelector } from "react-redux";
import "./Shopping.scss";
import Taro from "@tarojs/taro";
import ProductCard from "../../../../components/productCard/ProductCard";

function Shopping({ shoppingCurrentTopTab = 0 }) {
  console.log("shoppingCurrentTopTab", shoppingCurrentTopTab);
  const [isLoading, setIsLoading] = useState(true);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const tabBarHeight = Taro.getStorageSync("tabBarHeight");
  // console.log("navBarHeight", navBarHeight);
  // console.log("tabBarHeight", tabBarHeight);
  const isLogin = useSelector((state) => state.user.isLogin);

  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);

  const [activeBrandId, setActiveBrandId] = useState(0);

  const [currentTopTab, setCurrentTopTab] = useState(shoppingCurrentTopTab);
  const [searchBarHeight, setSearchBarHeight] = useState(42);
  const [tabsHeaderHeight, setTabsHeaderHeight] = useState(43);

  useEffect(() => {
    // 显示加载提示框
    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });

    // 模拟数据加载
    setTimeout(() => {
      setIsLoading(false); // 这里模拟加载完成，实际使用时你可能需要根据数据加载的结果来设置
      Taro.hideLoading();
    }, 500); // 这里模拟2秒的加载时间
  }, []);

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query
      .select(".searchBar")
      .boundingClientRect((rect) => {
        if (rect) {
          setSearchBarHeight(rect.height);
        }
      })
      .exec();
  }, []);

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query
      .select(".at-tabs__header")
      .boundingClientRect((rect) => {
        if (rect) {
          setTabsHeaderHeight(rect.height);
        }
      })
      .exec();
  }, []);

  const [value, setValue] = useState("");
  const [products, setProducts] = useState(productList);
  useEffect(() => {
    if (value.trim() === "") {
      setProducts(productList); // 如果搜索框为空，重置商品列表为所有商品
    } else {
      const filteredProducts = productList.filter((product) =>
        product.ref.toLowerCase().includes(value.toLowerCase())
      );
      setProducts(filteredProducts); // 如果搜索框不为空，更新商品列表为搜索结果
    }
  }, [value]);

  const handleTopTabClick = (index) => {
    setCurrentTopTab(index);
  };

  const handleBrandClick = (brandId) => {
    setActiveBrandId(brandId);
    console.log(activeBrandId);
  };

  const brandList = [
    { id: 1, name: "Brand A" },
    { id: 2, name: "Brand B" },
    { id: 3, name: "Brand C" },
    { id: 4, name: "Brand D" },
    { id: 5, name: "Brand E" },
    { id: 6, name: "Brand F" },
    { id: 7, name: "Brand G" },
    { id: 8, name: "Brand H" },
    { id: 9, name: "Brand I" },
    { id: 10, name: "Brand J" },
    { id: 11, name: "Brand J" },
    { id: 12, name: "Brand J" },
    { id: 13, name: "Brand J" },
    { id: 14, name: "Brand J" },
    { id: 15, name: "Brand J" },
    { id: 16, name: "Brand J" },
  ];
  const tabList = brandList.map((brand) => ({ title: brand.name }));

  console.log("searchBarHeight", searchBarHeight);
  console.log("tabsHeaderHeight", tabsHeaderHeight);

  return (
    <View>
      {!isLoading && (
        <View>
          <AtSearchBar
            className="searchBar"
            placeholder="请输入查询内容"
            value={value}
            onChange={(value) => setValue(value)}
            onActionClick={() => console.log({ value })}
          />
          <AtTabs
            scroll
            tabDirection="horizontal"
            current={activeBrandId}
            tabList={tabList}
            onClick={handleBrandClick}
          >
            {brandList.map((brand, index) => (
              <AtTabsPane current={activeBrandId} index={index} key={brand.id}>
                {activeBrandId === index && (
                  <ScrollView
                    scrollY
                    style={{
                      height: `calc(100vh - ${navBarHeight}px - ${tabBarHeight}px - ${tabsHeaderHeight}px - ${searchBarHeight}px)`,
                    }}
                  >
                    <GridView type="masonry" mainAxisGap={10} crossAxisGap={10}>
                      {products.map((product) => (
                        <ProductCard product={product} isCartBarShow={true} />
                      ))}
                    </GridView>
                  </ScrollView>
                )}
              </AtTabsPane>
            ))}
          </AtTabs>
        </View>
      )}
    </View>
  );
}

export default Shopping;
// const brandList = [
//   {
//     id: 1,
//     name: "Valentino",
//     img: Valentino,
//   },
//   {
//     id: 2,
//     name: "Valentino",
//     img: Valentino,
//   },
//   {
//     id: 3,
//     name: "Valentino",
//     img: Valentino,
//   },
//   {
//     id: 4,
//     name: "Valentino",
//     img: Valentino,
//   },
//   {
//     id: 5,
//     name: "Valentino",
//     img: Valentino,
//   },
//   {
//     id: 6,
//     name: "Valentino",
//     img: Valentino,
//   },
//   {
//     id: 7,
//     name: "Valentino",
//     img: Valentino,
//   },
//   {
//     id: 8,
//     name: "Valentino",
//     img: Valentino,
//   },
// ];

const productList = [
  {
    id: 1,
    title: "Product 1",
    ref: "GWA00135.A00013055312",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00135a00013055312_1_s.jpg",
    vendor: "Vendor 1",
    oldprice: 1000,
    price: 800,
    variants: [
      { size: "S", color: "Red", stock: 5 },
      { size: "S", color: "Blue", stock: 3 },
      { size: "M", color: "Red", stock: 8 },
      { size: "M", color: "Blue", stock: 10 },
      { size: "L", color: "Red", stock: 4 },
      { size: "L", color: "Blue", stock: 6 },
    ],
  },
  {
    id: 2,
    title: "Product 2",
    ref: "GWA00135.A00013055312",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00135a00013055312_2_s.jpg",
    vendor: "Vendor 2",
    oldprice: 1500,
    price: 1200,
    variants: [
      { size: "M", color: "Black", stock: 10 },
      { size: "M", color: "White", stock: 5 },
      { size: "L", color: "Black", stock: 12 },
      { size: "L", color: "White", stock: 8 },
    ],
  },
  {
    id: 3,
    title: "Product 3",
    ref: "GWA00135.A00013090100",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00135a00013090100_1_s.jpg",
    vendor: "Vendor 3",
    oldprice: 2000,
    price: 1600,
    variants: [
      { size: "S", color: "Red", stock: 7 },
      { size: "S", color: "Blue", stock: 5 },
      { size: "M", color: "Red", stock: 3 },
      { size: "M", color: "Blue", stock: 2 },
      { size: "L", color: "Red", stock: 10 },
      { size: "L", color: "Blue", stock: 8 },
    ],
  },
  {
    id: 4,
    title: "Product 4",
    ref: "GWA00135.A00013090100",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00135a00013090100_2_s.jpg",
    vendor: "Vendor 4",
    oldprice: 1800,
    price: 1400,
    variants: [
      { size: "S", color: "Red", stock: 6 },
      { size: "S", color: "Blue", stock: 4 },
      { size: "M", color: "Red", stock: 9 },
      { size: "M", color: "Blue", stock: 7 },
      { size: "L", color: "Red", stock: 5 },
      { size: "L", color: "Blue", stock: 3 },
    ],
  },
  {
    id: 5,
    title: "Product 5",
    ref: "GUP01035.P00060190100",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gup01035p00060190100_1_s.jpg",
    vendor: "Vendor 5",
    oldprice: 1200,
    price: 1000,
    variants: [
      { size: "S", color: "Red", stock: 8 },
      { size: "S", color: "Blue", stock: 6 },
      { size: "M", color: "Red", stock: 4 },
      { size: "M", color: "Blue", stock: 2 },
      { size: "L", color: "Red", stock: 7 },
      { size: "L", color: "Blue", stock: 5 },
    ],
  },
  {
    id: 6,
    title: "Product 6",
    ref: "GUP01035.P00060110190",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gup01035p00060110190_1_s.jpg",
    vendor: "Vendor 6",
    oldprice: 2200,
    price: 1800,
    variants: [
      { size: "S", color: "Red", stock: 3 },
      { size: "S", color: "Blue", stock: 5 },
      { size: "M", color: "Red", stock: 2 },
      { size: "M", color: "Blue", stock: 4 },
      { size: "L", color: "Red", stock: 6 },
      { size: "L", color: "Blue", stock: 8 },
    ],
  },
  {
    id: 7,
    title: "Product 7",
    ref: "GUP01035.P00060110190",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gup01035p00060110190_2_s.jpg",
    vendor: "Vendor 7",
    oldprice: 1900,
    price: 1500,
    variants: [
      { size: "S", color: "Red", stock: 5 },
      { size: "S", color: "Blue", stock: 3 },
      { size: "M", color: "Red", stock: 9 },
      { size: "M", color: "Blue", stock: 7 },
      { size: "L", color: "Red", stock: 4 },
      { size: "L", color: "Blue", stock: 6 },
    ],
  },
  {
    id: 8,
    title: "Product 8",
    ref: "GUP01038.P00059720103",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gup01038p00059720103_1_s.jpg",
    vendor: "Vendor 8",
    oldprice: 1400,
    price: 1100,
    variants: [
      { size: "S", color: "Red", stock: 7 },
      { size: "S", color: "Blue", stock: 5 },
      { size: "M", color: "Red", stock: 3 },
      { size: "M", color: "Blue", stock: 2 },
      { size: "L", color: "Red", stock: 10 },
      { size: "L", color: "Blue", stock: 8 },
    ],
  },
  {
    id: 9,
    title: "Product 9",
    ref: "GUP01053.P00066740385",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gup01053p00066740385_1_s.jpg",
    vendor: "Vendor 9",
    oldprice: 2600,
    price: 2200,
    variants: [
      { size: "S", color: "Red", stock: 4 },
      { size: "S", color: "Blue", stock: 6 },
      { size: "M", color: "Red", stock: 8 },
      { size: "M", color: "Blue", stock: 10 },
      { size: "L", color: "Red", stock: 3 },
      { size: "L", color: "Blue", stock: 5 },
    ],
  },
  {
    id: 10,
    title: "Product 10",
    ref: "GWA00101.A00010270130",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00101a00010270130_1_s.jpg",
    vendor: "Vendor 10",
    oldprice: 1700,
    price: 1300,
    variants: [
      { size: "S", color: "Red", stock: 5 },
      { size: "S", color: "Blue", stock: 7 },
      { size: "M", color: "Red", stock: 2 },
      { size: "M", color: "Blue", stock: 4 },
      { size: "L", color: "Red", stock: 6 },
      { size: "L", color: "Blue", stock: 8 },
    ],
  },
  {
    id: 11,
    title: "Product 11",
    ref: "GWA00228.A00033570140",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00228a00033570140_1_s.jpg",
    vendor: "Vendor 11",
    oldprice: 2400,
    price: 2000,
    variants: [
      { size: "S", color: "Red", stock: 10 },
      { size: "S", color: "Blue", stock: 8 },
      { size: "M", color: "Red", stock: 5 },
      { size: "M", color: "Blue", stock: 3 },
      { size: "L", color: "Red", stock: 7 },
      { size: "L", color: "Blue", stock: 4 },
    ],
  },
  {
    id: 12,
    title: "Product 12",
    ref: "GWA00375.A00033490100",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00375a00033490100_1_s.jpg",
    vendor: "Vendor 12",
    oldprice: 1800,
    price: 1500,
    variants: [
      { size: "S", color: "Red", stock: 6 },
      { size: "S", color: "Blue", stock: 4 },
      { size: "M", color: "Red", stock: 9 },
      { size: "M", color: "Blue", stock: 7 },
      { size: "L", color: "Red", stock: 5 },
      { size: "L", color: "Blue", stock: 3 },
    ],
  },
];

{
  /* <View
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                > */
}
