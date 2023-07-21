import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, GridView, Text } from "@tarojs/components";
import {
  AtSearchBar,
  AtTabs,
  AtTabsPane,
  AtFab,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtIndexes,
} from "taro-ui";
import ProductCard from "../../../components/productCard/ProductCard";
import Taro from "@tarojs/taro";
import NavBar from "../../../components/navbar/NavBar";
import { useSelector } from "react-redux";

let productList = [];
let list = [];

const ProductList = () => {
  const title = Taro.getCurrentInstance().router.params.title;
  const store = Taro.getCurrentInstance().router.params.store;

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");

  const [value, setValue] = useState("");

  if (title === "品牌店寻货") {
    productList = [
      {
        id: 1,
        title: "POLKA DOT DRESS WITH ASYMMETRIC COLLAR",
        ref: "FAB3334F3906",
        image:
          "https://catalog-resize-images.thedoublef.com/fc63b524e6eb113140bde869257ce483/900/900/FAB3334F3906_M_ALESS-1882.a.jpg",
        vendor: "ALESSANDRA RICH",
        officePrice: 1185,
        asiaPrice: 10500,
        variants: [{ size: "42", color: "淡粉色" }],
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
        variants: [{ size: "42", color: "黄色", stock: 1 }],
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
        variants: [{ size: "42", color: "棕色" }],
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
        variants: [{ size: "40", color: "粉色" }],
      },
      {
        id: 5,
        title: "Chemise sans manches en fil coupé Monogram",
        ref: "1ABT30",
        image:
          "https://fr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-chemise-sans-manches-en-fil-coup%C3%A9-monogram-pr%C3%AAt-%C3%A0-porter--FPBL28UM7000_PM2_Front%20view.png?wid=1090&hei=1090",
        vendor: "Louis Vuitton",
        officePrice: 1550,
        asiaPrice: "N/A",
        variants: [{ size: "38", color: "白色" }],
      },
    ];
  } else {
    productList = [
      {
        id: 1,
        title: "GABARDINE TOP",
        ref: "FAB3154F3853",
        image:
          "https://alessandrarich.com/cdn/shop/products/FAB3154F38531795GREEN_a_720x.jpg?v=1668103033",
        vendor: "ALESSANDRA RICH",
        officePrice: 380,
        asiaPrice: 3350,
        variants: [{ size: "42", color: "绿色" }],
      },
      {
        id: 2,
        title: "LUREX LACE KNIT TOP",
        ref: "FAB3246K3839",
        image:
          "https://alessandrarich.com/cdn/shop/products/FAB3246K38395244PINK_a_720x.jpg?v=1668175672",
        vendor: "ALESSANDRA RICH",
        officePrice: 290,
        asiaPrice: 2600,
        variants: [
          { size: "40", color: "粉色", stock: 1 },
          { size: "42", color: "粉色", stock: 1 },
        ],
      },
      {
        id: 3,
        title: "LUREX LACE KNIT FLARED MIDI SKIRT",
        ref: "FAB3341F3906",
        image:
          "https://alessandrarich.com/cdn/shop/products/FAB3249K38395244PINK_f_720x1080.jpg?v=1668175321",
        vendor: "ALESSANDRA RICH",
        officePrice: 330,
        asiaPrice: 2950,
        variants: [
          { size: "40", color: "粉色", stock: 1 },
          { size: "42", color: "粉色", stock: 1 },
        ],
      },
      {
        id: 4,
        title: "GABARDINE CARGO PANTS",
        ref: "FAB3157F3853",
        image:
          "https://alessandrarich.com/cdn/shop/products/FAB3157F38531795GREEN_acopy_720x.jpg?v=1668102807",
        vendor: "ALESSANDRA RICH",
        officePrice: 530,
        asiaPrice: 4700,
        variants: [
          { size: "27", color: "绿色" },
          { size: "29", color: "绿色" },
        ],
      },
    ];
  }

  if (title === "品牌店寻货") {
    list = [
      {
        title: "A",
        key: "A",
        items: [
          {
            name: "ALESSANDRA RICH",
          },
        ],
      },
      {
        title: "B",
        key: "B",
        items: [
          {
            name: "Brand B",
          },
          {
            name: "Brand C",
          },
          {
            name: "Brand D",
          },
          {
            name: "Brand E",
          },
          {
            name: "Brand F",
          },
          {
            name: "Brand G",
          },
          {
            name: "Brand H",
          },
          {
            name: "Brand I",
          },
          {
            name: "Brand J",
          },
        ],
      },
      {
        title: "L",
        key: "L",
        items: [
          {
            name: "Louis Vuitton",
          },
        ],
      },
    ];
  } else {
    list = [
      {
        title: "A",
        key: "A",
        items: [
          {
            name: "ALESSANDRA RICH",
          },
        ],
      },
      {
        title: "B",
        key: "B",
        items: [
          {
            name: "Brand B",
          },
          {
            name: "Brand C",
          },
          {
            name: "Brand D",
          },
          {
            name: "Brand E",
          },
          {
            name: "Brand F",
          },
          {
            name: "Brand G",
          },
          {
            name: "Brand H",
          },
          {
            name: "Brand I",
          },
          {
            name: "Brand J",
          },
        ],
      },
    ];
  }

  // 生成品牌列表
  let idCounter = 0;

  const brandList = list
    .reduce((brands, category) => {
      return brands.concat(category.items);
    }, [])
    .map((brand) => {
      idCounter++;
      return { id: idCounter, ...brand };
    });

  
  const [products, setProducts] = useState(productList); // 初始值为所有商品
  
  
  //从地图跳转过来的时候，根据店铺名称，自动切换到对应的tab
  let index = 0;
  if (store) {
    let brand = brandList.find((brand) => brand.name.includes(store) || store.includes(brand.name));
    
    if (brand) {
      index = brand.id - 1;
    }
  }

  const [currentTab, setCurrentTab] = useState(index);

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

  const containerRef = useRef(null);

  const handleScrollIntoView = (fn) => {
    fn && fn();
    if (containerRef.current) {
      console.log(containerRef.current.scrollTop);
    }
  };

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
                    {products
                      .filter((product) => product.vendor === brand.name)
                      .map((product) => (
                        <ProductCard product={product} isCartBarShow={false} />
                      ))}
                  </GridView>
                </View>
              )}
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>

      {title === "寻价" && (
        <View>
          <View
            style={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              opacity: "0.5",
            }}
          >
            <AtFab onClick={() => setIsModalOpen(true)}>
              <Text style={{fontSize: "15px"}}>品牌列表</Text>
            </AtFab>
          </View>
          <AtModal isOpened={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AtModalHeader>品牌列表</AtModalHeader>
            <AtModalContent>
              <AtIndexes
                list={list}
                onScrollIntoView={handleScrollIntoView}
                onClick={(item) => {
                  let selectedBrand = brandList.find(
                    (brand) => brand.name === item.name
                  );
                  console.log(selectedBrand);
                  setCurrentTab(selectedBrand.id - 1);
                  setIsModalOpen(false);
                }}
              />
            </AtModalContent>
          </AtModal>
        </View>
      )}
    </View>
  );
};

export default ProductList;
