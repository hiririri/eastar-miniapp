import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTag } from "taro-ui";

function ProductInfoCard(props) {
  const {
    product,
    sizeOptions,
    selectedOptionIndex,
    setSelectedOptionIndex,
    setProduct,
    setSelectedStock,
    isCartBarShow,
  } = props;

  console.log("product: ", product);

  const show = isCartBarShow === "true" ? true : false;

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "20px",
    margin: "20px",
  };

  return (
    <View style={cardStyle}>
      <View style={{ padding: "5px" }}>
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          {product.title}
        </Text>

        <View>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "6px",
            }}
          >
            货号
          </Text>
          <Text style={{ marginLeft: "6px" }}>{product.ref}</Text>
        </View>

        {show ? (
          <View style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <Text
              style={{
                color: "#d3d3d3",
                fontSize: 16,
                textDecorationLine: "line-through",
              }}
            >
              {product.oldprice}€
            </Text>
            <Text style={{ fontSize: 16 }}>{product.price}€</Text>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: 16 }}>
              欧洲价格：{product.officePrice}€
            </Text>
            <Text style={{ fontSize: 16 }}>
              亚洲价格：{product.asiaPrice}￥
            </Text>
          </View>
        )}

        <View>
          <View style={{ marginTop: "20px" }}>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              尺码
            </Text>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {sizeOptions.map((option, index) => (
                <AtTag
                  key={index}
                  circle
                  className="tag"
                  active={index === selectedOptionIndex}
                  type="primary"
                  onClick={() => {
                    setProduct({
                      ...product,
                      size: option.size,
                      color: option.color,
                      max: option.stock,
                      value: 1,
                    });
                    setSelectedStock(option.stock);
                    setSelectedOptionIndex(index);
                    console.log(index === selectedOptionIndex);
                  }}
                >
                  {option.size}
                  <Text style={{ fontSize: "12px", marginLeft: "6px" }}>
                    颜色: {option.color}
                  </Text>
                  <Text style={{ fontSize: "12px", marginLeft: "6px" }}>
                    库存: {option.stock}
                  </Text>
                </AtTag>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProductInfoCard;
