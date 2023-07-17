import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView, GridView } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtSearchBar } from "taro-ui";
import { useSelector } from "react-redux";
import "./Shopping.scss";
import Taro from "@tarojs/taro";
import ProductCard from "../../../components/productCard/ProductCard";
import NavBar from "../../../components/navbar/NavBar";

function Shopping({ shoppingCurrentTopTab = 0 }) {
  console.log("shoppingCurrentTopTab", shoppingCurrentTopTab);
  const [isLoading, setIsLoading] = useState(true);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
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
      <NavBar title="买手店" systemInfo={systemInfo} root={false} />
      {!isLoading && (
        <View style={{ paddingTop: navBarHeight + "px" }}>
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
                      height: `calc(100vh - ${navBarHeight}px - ${tabsHeaderHeight}px - ${searchBarHeight}px)`,
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

const productList = [
  {
    id: 1,
    title: "POLKA DOT DRESS WITH ASYMMETRIC COLLAR",
    ref: "FAB3334F3906",
    image:
      "https://alessandrarich.com/cdn/shop/products/FAB3334F39061882ALMOND-BROWN_a_720x.jpg?v=1673533694",
    vendor: "ALESSANDRA RICH",
    oldprice: 1890,
    price: 945,
    variants: [{ size: "42", color: "淡粉色", stock: 1 }],
  },
  {
    id: 2,
    title: "VIOLET PRINT JACQUARD PLEATED MINI DRESS",
    ref: "FAB3271F3779",
    image:
      "https://alessandrarich.com/cdn/shop/products/FAB3271F37791623YELLOW_a_720x.jpg?v=1668180770",
    vendor: "ALESSANDRA RICH",
    oldprice: 1780,
    price: 890,
    variants: [{ size: "42", color: "黄色", stock: 1 }],
  },
  {
    id: 3,
    title: "POLKA DOT SLEEVELESS DRESS DRAPED NECK",
    ref: "FAB3341F3906",
    image:
      "https://alessandrarich.com/cdn/shop/products/FAB3341F39061758BROWN-BLACK_a_720x.jpg?v=1673533823",
    vendor: "ALESSANDRA RICH",
    oldprice: 1485,
    price: 742.5,
    variants: [{ size: "42", color: "棕色", stock: 1 }],
  },
  {
    id: 4,
    title: "FLAME KNITTED LONG CARDIGAN",
    ref: "FAB3302F392",
    image:
      "https://alessandrarich.com/cdn/shop/products/FAB3264K38479122PINK-LILAC_a_720x.jpg?v=1668102384",
    vendor: "ALESSANDRA RICH",
    oldprice: 1100,
    price: 550,
    variants: [{ size: "42", color: "粉色", stock: 1 }],
  },
];
