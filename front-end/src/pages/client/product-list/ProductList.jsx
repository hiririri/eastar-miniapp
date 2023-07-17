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
    title: "POLKA DOT DRESS WITH ASYMMETRIC COLLAR",
    ref: "FAB3334F3906",
    image:
      "https://catalog-resize-images.thedoublef.com/fc63b524e6eb113140bde869257ce483/900/900/FAB3334F3906_M_ALESS-1882.a.jpg",
    vendor: "ALESSANDRA RICH",
    officePrice: 1185,
    asiaPrice: 10500,
    variants: [
      { size: "42", color: "淡粉色" },
    ],
  },
  {
    id: 2,
    title: "VIOLET PRINT JACQUARD PLEATED MINI DRESS",
    ref: "FAB3271F3779",
    image:
      "https://alessandrarich.com/cdn/shop/products/FAB3271F37791623YELLOW_a_720x.jpg?v=1668180770",
    vendor: "ALESSANDRA RICH",
    officePrice: 1299,
    asiaPrice: 11500,
    variants: [
      { size: "42", color: "黄色", stock: 1 },
    ],
  },
  {
    id: 3,
    title: "POLKA DOT SLEEVELESS DRESS DRAPED NECK",
    ref: "FAB3341F3906",
    image:
      "https://alessandrarich.com/cdn/shop/products/FAB3341F39061758BROWN-BLACK_a_720x.jpg?v=1673533823",
      vendor: "ALESSANDRA RICH",
    officePrice: 935,
    asiaPrice: 8250,
    variants: [
      { size: "42", color: "棕色" },
    ],
  },
  {
    id: 4,
    title: "FLAME KNITTED LONG CARDIGAN",
    ref: "FAB3302F392",
    image:
      "https://alessandrarich.com/cdn/shop/products/FAB3264K38479122PINK-LILAC_a_720x.jpg?v=1668102384",
      vendor: "ALESSANDRA RICH",
    officePrice: 695,
    asiaPrice: 6150,
    variants: [
      { size: "40", color: "粉色" },
    ],
  },
];
