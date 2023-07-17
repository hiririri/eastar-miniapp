import { View, Text, Image } from "@tarojs/components";
import React from "react";


const BrandCard = ({ title, img, handleClick }) => {
  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "150px",
        border: "1px solid #eeeeee",
        borderRadius: "25px",
        marginBottom: "20px",
        color: "white",
        justifyContent: "center",
      }}
      onClick={handleClick}
    >
      <Image
        src={img}
        mode="aspectFill"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
          borderRadius: "25px",
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
          borderRadius: "25px",
          backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
        }}
      />
      <View style={{ padding: "10px" }}>
        <Text style={{ fontSize: "30px", fontWeight: "700" }}>{title}</Text>
      </View>
    </View>
  );
};

export default BrandCard;