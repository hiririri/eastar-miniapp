import { Map, View, Text } from "@tarojs/components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { AtNavBar, AtActionSheet, AtActionSheetItem, AtFab } from "taro-ui";
import placeHolder from "../../../assets/icons/placeholder.png";
import NavBar from "../../../components/navbar/NavBar";
import Auth from "../../auth/Auth";

const lvStores = [
  {
    id: 1,
    latitude: 48.87371,
    longitude: 2.331987,
    title: "Louis Vuitton Galerie Laffayette",
    address: "40 Boulevard Haussmann, 75009 Paris, France",
    phone: "+33 9 77 40 40 77",
    image:
      "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--StFi_Louis_Vuitton_Galerie_Lafayette_2021_Slideshow_02_DI3.jpg?wid=490",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Louis Vuitton\nGalerie Laffayette",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 2,
    latitude: 48.86667,
    longitude: 2.32882,
    title: "Louis Vuitton Vendôme",
    address: "2 Place Vendôme, 75001 Paris, France",
    phone: "+33 1 55 35 40 00",
    image:
      "https://ideat.fr/wp-content/thumbnails/uploads/sites/3/2017/11/place-vendocc82me-store-day-front-3-louis-vuitton-stephane-muratet-tt-width-1120-height-718-crop-1-bgcolor-ffffff.jpg",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Louis Vuitton\nVendôme",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 3,
    latitude: 48.87215,
    longitude: 2.29949,
    title: "Louis Vuitton Champs-Elysées",
    address: "101 Avenue des Champs-Élysées, 75008 Paris, France",
    phone: "+33 1 53 57 52 00",
    image:
      "https://www.connaissancedesarts.com/wp-content/thumbnails/uploads/2023/01/cda23_actu_louisvuitton_main-tt-width-1200-height-675-fill-0-crop-1-bgcolor-ffffff.jpg",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Louis Vuitton\nChamps-Elysées",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 4,
    latitude: 48.87407684611842,
    longitude: 2.328335383711712,
    title: "Louis Vuitton Printemps Haussmann",
    address: "64 Boulevard Haussmann, 75009 Paris, France",
    phone: "+33 1 42 82 41 71",
    image:
      "https://fr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--StFi_Louis_Vuitton_Printemps_Corner_Shoes_DI3.jpg",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Louis Vuitton\nPrintemps Haussmann",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 5,
    latitude: 48.854380318412275,
    longitude: 2.332899235744362,
    title: "Louis Vuitton Saint-Germain-des-Prés",
    address: "170 Boulevard Saint-Germain, 75006 Paris, France",
    phone: "+33 9 77 40 40 77",
    image:
      "https://fr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Stfi_PSG_1_DI3.jpg?wid=490",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Louis Vuitton\nSaint-Germain-des-Prés",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
];
const gucciStores = [
  {
    id: 1,
    latitude: 48.8699306,
    longitude: 2.3183972,
    title: "Gucci Paris Flagship Royale",
    iconPath: placeHolder,
    width: 40,
    height: 40,
    callout: {
      content: "Gucci Paris\nFlagship Royale",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 2,
    latitude: 48.868238,
    longitude: 2.309236,
    title: "Gucci Paris Flagship Montaigne",
    iconPath: placeHolder,
    width: 40,
    height: 40,
    callout: {
      content: "Gucci Paris\nFlagship Montaigne",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 3,
    latitude: 48.850509,
    longitude: 2.324391,
    title: "Gucci Paris Le Bon Marché Women",
    iconPath: placeHolder,
    width: 40,
    height: 40,
    callout: {
      content: "Gucci Paris\nLe Bon Marché Women",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
];
const chanelStores = [
  {
    id: 1,
    latitude: 48.868161,
    longitude: 2.326699,
    title: "Chanel Rue Cambon",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Chanel\nRue Cambon",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 2,
    latitude: 48.8717,
    longitude: 2.3043,
    title: "Chanel Haussmann",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Chanel\nHaussmann",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 3,
    latitude: 48.8667,
    longitude: 2.3044,
    title: "Chanel Avenue Montaigne",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Chanel\nAvenue Montaigne",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
  {
    id: 4,
    latitude: 48.8675,
    longitude: 2.3205,
    title: "Chanel Rue Royale",
    iconPath: placeHolder, // 这是你本地的图片路径
    width: 40,
    height: 40,
    callout: {
      content: "Chanel\nRue Royale",
      display: "ALWAYS",
      color: "#000",
      bgColor: "#FFF",
      borderRadius: 5,
    },
  },
];

// 为每个品牌的商店重新分配id，避免冲突
const reassignStoreIds = (stores, startId) => {
  return stores.map((store, index) => {
    return { ...store, id: startId + index };
  });
};

// 重新分配id，并将所有商店数据合并为一个数组
const allStores = [
  ...reassignStoreIds(lvStores, 1),
  ...reassignStoreIds(gucciStores, lvStores.length + 1),
  ...reassignStoreIds(chanelStores, lvStores.length + gucciStores.length + 1),
];

const StoreMap = () => {
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [stores, setStores] = useState(allStores);
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);

  const navBarHeight = Taro.getStorageSync("navBarHeight");
  // console.log("Root is rendering");

  const [isLoading, setIsLoading] = useState(true);

  const handleMapClick = () => {
    setActionSheetOpen(true);
  };

  const handleActionSheetClose = () => {
    setActionSheetOpen(false);
  };

  const handleBrandSelect = (brandName) => {
    console.log(brandName);
    setActionSheetOpen(false);
    // 在这里你可以根据选择的品牌做出响应
    switch (brandName) {
      case "Louis Vuitton":
        setStores(lvStores);
        break;
      case "Gucci":
        setStores(gucciStores);
        break;
      case "Chanel":
        setStores(chanelStores);
        break;
      default:
        setStores(allStores);
        break;
    }
  };

  const safeAreaHeight = systemInfo.safeArea.bottom - navBarHeight;

  const handleMarkerTap = (e) => {
    // 在这里处理标记点击事件
    const markerId = e.markerId; // markerId 是你点击的标记的id

    // 找到点击的店铺
    const clickedStore = stores.find((store) => store.id === markerId);

    if (clickedStore) {
      console.log(clickedStore.title);
      let storeInfo = JSON.stringify(clickedStore);
      Taro.navigateTo({
        url: `/pages/client/store/Store?storeInfo=${encodeURIComponent(
          storeInfo
        )}`,
      });
    }
  };

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="地图" />
      <View
        style={{
          paddingTop: navBarHeight + "px",
          height: `calc(100vh - ${navBarHeight}px)`,
          width: "100%",
        }}
      >
        <Map
          longitude={2.3249971543289574}
          latitude={48.87159307588451}
          scale={14}
          show-location
          markers={stores}
          onMarkerTap={handleMarkerTap}
          style={{
            height: `calc(100vh - ${navBarHeight}px)`,
            width: "100%",
          }}
        />

        <View
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            opacity: "0.5",
          }}
        >
          <AtFab onClick={handleMapClick}>
            <Text className="at-fab__icon at-icon at-icon-menu"></Text>
          </AtFab>
        </View>

        <AtActionSheet
          isOpened={actionSheetOpen}
          onClose={handleActionSheetClose}
          cancelText="取消"
          title="选择品牌"
        >
          <AtActionSheetItem onClick={() => handleBrandSelect("Louis Vuitton")}>
            Louis Vuitton
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => handleBrandSelect("Gucci")}>
            Gucci
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => handleBrandSelect("Chanel")}>
            Chanel
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => handleBrandSelect("")}>
            所有店铺
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    </View>
  );
};

export default Auth(StoreMap);
