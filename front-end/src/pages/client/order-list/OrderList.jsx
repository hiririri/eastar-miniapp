import { View, ScrollView, Image, Text, Button } from "@tarojs/components";
import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import Taro from "@tarojs/taro";
import { useSelector } from "react-redux";
import {
  AtTabs,
  AtTabsPane,
  AtCard,
  AtButton,
  AtModalContent,
  AtModalAction,
  AtModalHeader,
  AtModal,
  AtTextarea,
  AtDivider,
  AtSteps,
} from "taro-ui";
import { useEffect } from "react";
import { set } from "lodash";

const tabList = [
  { title: "全部", status: "all" },
  { title: "待付款", status: "unpayed" },
  { title: "已付款", status: "payed" },
  { title: "退款", status: "refunded" },
];

const OrderList = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const [current, setCurrent] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [isRefundModalOpened, setIsRefundModalOpened] = useState(false);
  const [refundReason, setRefundReason] = useState("");

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const storageInfo = await Taro.getStorageInfo();
        let orders;
        if (storageInfo.keys.indexOf("order") !== -1) {
          const res = await Taro.getStorage({ key: "order" });
          const status = tabList[current].status;

          let orders;
          if (status === "all") {
            orders = res.data;
          } else {
            orders = res.data.filter((item) => item.status === status);
          }

          setOrderList(orders);
          console.log("orders", orders);
        } else {
          setOrderList([]);
        }

        // if (!res.data) {
        //   console.log("No orders found");
        //   setOrderList([]);
        // } else {
        //   const status = tabList[current].status;

        //   let orders;
        //   if (status === "all") {
        //     orders = res.data;
        //   } else {
        //     orders = res.data.filter((item) => item.status === status);
        //   }

        //   setOrderList(orders);
        // }
      } catch (error) {
        console.error("Could not retrieve order:", error);
        setOrderList([]); // set empty list in case of any error
      }
    };
    fetchOrderList();
  }, [current]);

  return (
    <View>
      <NavBar systemInfo={systemInfo} title="我的订单" root={false} />
      <View style={{ paddingTop: navBarHeight + "px" }}>
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={(value) => {
            setCurrent(value);
          }}
        >
          <View style={{}}>
            {tabList.map((item, index) => {
              return (
                <AtTabsPane current={current} index={index}>
                  <View
                    style={{
                      height: `calc(100vh - ${navBarHeight}px`,
                      backgroundColor: "#FAFBFC",
                      marginTop: "10px",
                    }}
                  >
                    <ScrollView
                      scrolly
                      style={{
                        height: `calc(100vh - ${navBarHeight}px`,
                        backgroundColor: "#FAFBFC",
                      }}
                    >
                      {orderList.map((order) => {
                        const totalPrice = order.items.reduce(
                          (acc, item) => acc + item.price * item.value,
                          0
                        );
                        return (
                          <View key={order.id} style={{ marginBottom: "10px" }}>
                            <AtCard
                              title={"订单号：" + order.id}
                              note={"总价：" + totalPrice}
                            >
                              {order.items.map((item) => (
                                <View
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "50px",
                                    }}
                                  >
                                    {item.vendor} : {item.title}
                                  </Text>
                                  <Text>
                                    颜色：{item.color}，尺码：{item.size}
                                  </Text>
                                  <View
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <Image
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                      }}
                                      src={item.imageUrl}
                                    />
                                    <Text>
                                      {item.price} x{item.value}
                                    </Text>
                                  </View>
                                  {/* {order.items.length > 1 && (
                                  <AtDivider lineColor="#2d8cf0" />
                                )} */}
                                </View>
                              ))}
                              {order.status === "unpayed" && (
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center", // alignSelf 用于单独的子项，对于 flex 容器应该使用 alignItems
                                    justifyContent: "flex-end", // 将按钮对齐到左边
                                    gap: "10px",
                                  }}
                                >
                                  <AtButton
                                    circle
                                    type="secondary"
                                    size="small"
                                    onClick={() => {
                                      console.log("去付款");
                                      order.status = "payed";
                                      setOrderList([...orderList]);
                                      setCurrentOrder(order);
                                      Taro.setStorage({
                                        key: "order",
                                        data: orderList,
                                      });
                                    }}
                                  >
                                    去付款
                                  </AtButton>
                                  <AtButton
                                    circle
                                    type="secondary"
                                    size="small"
                                    onClick={() => {
                                      console.log("删除订单");
                                      setIsModalOpened(true);
                                      setCurrentOrder(order);
                                    }}
                                  >
                                    删除订单
                                  </AtButton>
                                </View>
                              )}
                              {order.status === "payed" && (
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center", // alignSelf 用于单独的子项，对于 flex 容器应该使用 alignItems
                                    justifyContent: "flex-end", // 将按钮对齐到左边
                                    gap: "10px",
                                  }}
                                >
                                  <AtButton
                                    circle
                                    type="secondary"
                                    size="small"
                                    onClick={() => {
                                      console.log("退款");
                                      setIsRefundModalOpened(true);
                                      setIsModalOpened(true);
                                      setCurrentOrder(order);
                                    }}
                                  >
                                    退款
                                  </AtButton>
                                </View>
                              )}
                              {order.status === "refunded" && (
                                <AtSteps
                                  items={[
                                    { title: "提交申请" },
                                    { title: "等待审核" },
                                    { title: "退款成功" },
                                  ]}
                                  current={1}
                                />
                              )}
                            </AtCard>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </AtTabsPane>
              );
            })}
          </View>
        </AtTabs>
      </View>

      <AtModal closeOnClickOverlay={false} isOpened={isModalOpened}>
        <AtModalHeader>
          {!isRefundModalOpened ? "确认删除订单？" : "确认是否退款？"}
        </AtModalHeader>
        {isRefundModalOpened && (
          <AtModalContent>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Text>退款原因：</Text>
              <AtTextarea
                value={refundReason}
                count={false}
                maxLength={200}
                onChange={(value) => setRefundReason(value)}
              />
            </View>
          </AtModalContent>
        )}
        <AtModalAction>
          <Button
            onClick={() => {
              setIsModalOpened(false);
              setIsRefundModalOpened(false);
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              if (isRefundModalOpened) {
                //发送退款请求
                //...
                currentOrder.status = "refunded";
                currentOrder.refundReason = refundReason;
                // 找到并更新订单
                const orderIndex = orderList.findIndex(
                  (order) => order.id === currentOrder.id
                );
                if (orderIndex !== -1) {
                  orderList[orderIndex] = currentOrder;
                  setOrderList([...orderList]);
                  Taro.setStorage({
                    key: "order",
                    data: orderList,
                  });
                }
              } else {
                //发送删除订单请求
                //...
                const newOrderList = orderList.filter(
                  (order) => order.id !== currentOrder.id
                );
                setOrderList(newOrderList);
                Taro.setStorage({
                  key: "order",
                  data: newOrderList,
                });
              }
              setIsModalOpened(false);
              setIsRefundModalOpened(false);
            }}
          >
            确认
          </Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
};

export default OrderList;
