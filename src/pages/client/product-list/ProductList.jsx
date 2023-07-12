import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, GridView } from "@tarojs/components";
import { AtSearchBar, AtTabs, AtTabsPane } from "taro-ui";
import ProductCard from "../../../components/productCard/ProductCard";
import Taro from "@tarojs/taro";
import NavBar from "../../../components/navbar/NavBar";
import { useSelector } from "react-redux";

const ProductList = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const { title } = Taro.getCurrentInstance().router.params;
  const [value, setValue] = useState("");
  const [products, setProducts] = useState(productList); // 初始值为所有商品
  const [currentTab, setCurrentTab] = useState(0);

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

  const [searchBarHeight, setSearchBarHeight] = useState(42);

  useLayoutEffect(() => {
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
      .select(".searchBar")
      .boundingClientRect((rect) => {
        if (rect) {
          setSearchBarHeight(rect.height);
        }
      })
      .exec();
  }, [value]);

  console.log("searchBarHeight : ", searchBarHeight);

  const tabList = brandList.map((brand) => ({ title: brand.name }));

  return (
    <View>
      <NavBar systemInfo={systemInfo} title={title} />

      <View style={{ paddingTop: navBarHeight + "px" }}>
        <View
          style={{
            position: "fixed",
            top: navBarHeight + "px",
            width: "100%",
            zIndex: 1,
          }}
        >
          <AtSearchBar
            className="searchBar"
            placeholder="请输入查询内容"
            value={value}
            onChange={(value) => setValue(value)}
            onActionClick={() => console.log({ value })}
          />
        </View>

        <View style={{ paddingTop: `${searchBarHeight}px` }} />

        <AtTabs
          scroll
          tabDirection="horizontal"
          current={currentTab}
          tabList={tabList}
          onClick={(value) => setCurrentTab(value)}
        >
          {brandList.map((brand, index) => (
            <AtTabsPane current={currentTab} index={index} key={brand.id}>
              {currentTab === index && (
                <View style={{ padding: "5px" }}>
                  <GridView type="masonry" mainAxisGap={10} crossAxisGap={10}>
                    {products.map((product) => (
                      <ProductCard product={product} isCartBarShow={false} />
                    ))}
                  </GridView>
                </View>
              )}
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
    </View>
  );
};

export default ProductList;

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

const productList = [
  {
    id: 1,
    title: "Product 1",
    ref: "GWA00135.A00013055312",
    image:
      "https://www.lapasquala.it/foto/p23/golden%20goose/gwa00135a00013055312_1_s.jpg",
    vendor: "Vendor 1",
    officePrice: 1000,
    asiaPrice: 800,
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
    officePrice: 1500,
    asiaPrice: 1200,
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
    officePrice: 2000,
    asiaPrice: 1600,
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
    officePrice: 1800,
    asiaPrice: 1400,
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
    officePrice: 1200,
    asiaPrice: 1000,
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
    officePrice: 2200,
    asiaPrice: 1800,
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
    officePrice: 1900,
    asiaPrice: 1500,
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
    officePrice: 1400,
    asiaPrice: 1100,
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
    officePrice: 2600,
    asiaPrice: 2200,
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
    officePrice: 1700,
    asiaPrice: 1300,
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
    officePrice: 2400,
    asiaPrice: 2000,
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
    officePrice: 1800,
    asiaPrice: 1500,
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
