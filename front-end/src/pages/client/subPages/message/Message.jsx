import { View, Text, ScrollView, Button, Image } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton,
  AtInput,
  AtIcon,
  AtTabs,
  AtTabsPane,
  AtCard,
} from "taro-ui";
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { useSelector } from "react-redux";

const messageList = [
  {
    supplierId: 1,
    supplierName: "供应商1",
    list: [
      {
        id: 1,
        title: "标题文字1",
        note: "描述信息1",
        extraText: "扩展信息",
        arrow: "right",
        status: "pending",
      },
      {
        id: 2,
        title: "标题文字2",
        note: "描述信息2",
        extraText: "扩展信息",
        arrow: "right",
        status: "pending",
      },
    ],
  },
  {
    supplierId: 2,
    supplierName: "供应商2",
    list: [
      {
        id: 3,
        title: "标题文字3",
        note: "描述信息3",
        extraText: "扩展信息",
        arrow: "right",
        status: "pending",
      },
      {
        id: 4,
        title: "标题文字4",
        note: "描述信息4",
        extraText: "扩展信息",
        arrow: "right",
        status: "pending",
      },
      {
        id: 5,
        title: "标题文字5",
        note: "描述信息5",
        extraText: "扩展信息",
        arrow: "right",
        status: "pending",
      },
    ],
  },
  {
    supplierId: 3,
    supplierName: "供应商3",
    list: [
      {
        id: 6,
        title: "标题文字6",
        note: "描述信息6",
        extraText: "扩展信息",
        arrow: "right",
        status: "processing",
      },
      {
        id: 7,
        title: "标题文字7",
        note: "描述信息7",
        extraText: "扩展信息",
        arrow: "right",
        status: "processing",
      },
      {
        id: 8,
        title: "标题文字8",
        note: "描述信息8",
        extraText: "扩展信息",
        arrow: "right",
        status: "processing",
      },
    ],
  },
  {
    supplierId: 4,
    supplierName: "供应商4",
    list: [
      {
        id: 9,
        title: "标题文字9",
        note: "描述信息9",
        extraText: "扩展信息",
        arrow: "right",
        status: "processing",
      },
      {
        id: 9,
        title: "标题文字1111",
        note: "描述信息9",
        extraText: "扩展信息",
        arrow: "right",
        status: "finalized",
      },
    ],
  },
];

const Message = () => {
  useEffect(() => {
    if (isLogin) {
      Taro.createSelectorQuery()
        .select(".at-tabs__header")
        .boundingClientRect((rect) => {
          Taro.setStorageSync("tabsHeaderHeight", rect.height);
        })
        .exec();
    }
  }, []);

  const isLogin = useSelector((state) => state.user.isLogin);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const tabBarHeight = Taro.getStorageSync("tabBarHeight");
  const tabsHeaderHeight = Taro.getStorageSync("tabsHeaderHeight");

  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isConserve, setIsConserve] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const statusCategories = ["pending", "processing", "finalized"];
  console.log("isLogin", isLogin);

  const [messageGroups, setMessageGroups] = useState([]);

  useEffect(() => {
    // mock data
    const sortedMessageList = {};

    messageList.forEach(({ supplierId, supplierName, list }) => {
      sortedMessageList[supplierId] = sortedMessageList[supplierId] || {
        supplierName,
        list: {},
      };
      list.forEach((item) => {
        sortedMessageList[supplierId].list[item.status] =
          sortedMessageList[supplierId].list[item.status] || [];
        sortedMessageList[supplierId].list[item.status].push(item);
      });
    });

    setMessageGroups(sortedMessageList);
  }, []);

  return (
    <View
      style={{
        height: `calc(100vh - ${navBarHeight}px - ${tabBarHeight}px)`,
        display: "flex",
        flexDirection: "column",
        alignContent: isLogin ? "flex-start" : "center",
        justifyContent: isLogin ? "flex-start" : "center",
      }}
    >
      {isLogin ? (
        <AtTabs
          current={currentTab}
          tabList={statusCategories.map((status) => ({ title: status }))}
          onClick={(value) => setCurrentTab(value)}
        >
          {statusCategories.map((status, index) => (
            <AtTabsPane current={currentTab} index={index} key={index}>
              <ScrollView
                scrollY
                style={{
                  height: `calc(100vh - ${navBarHeight}px - ${tabBarHeight}px - ${tabsHeaderHeight}px)`,
                }}
              >
                {Object.values(messageGroups).map((group) =>
                  group.list[status]?.length ? (
                    <View style={{ marginBottom: "10px" }}>
                      <AtCard
                        key={group.supplierId}
                        title={group.supplierName}
                        onClick={() => {
                          setIsOpened(true);
                          setSelectedItem(group);
                        }}
                      >
                        <AtList>
                          {group.list[status].map((item) => (
                            <AtListItem
                              key={item.id}
                              title={item.title}
                              note={item.note}
                              arrow={item.arrow}
                              extraText={item.extraText}
                            />
                          ))}
                        </AtList>
                      </AtCard>
                    </View>
                  ) : null
                )}
              </ScrollView>
            </AtTabsPane>
          ))}
        </AtTabs>
      ) : (
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AtIcon value="blocked" size="60" color="#999"></AtIcon>
          <Text>请先登录</Text>
        </View>
      )}

      <AtModal isOpened={isOpened}>
        {selectedItem && <AtModalHeader>{selectedItem.title}</AtModalHeader>}
        <AtModalContent>
          <Image src="https://www.lapasquala.it/foto/p23/golden%20goose/gwa00135a00013055312_1_s.jpg" />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <Text>Ref: 123456789</Text>
            <Text>{selectedItem.note}</Text>
          </View>

          {isConserve && (
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <AtInput
                  name="value"
                  title="姓名"
                  type="text"
                  placeholder="请输入姓名"
                />
                <AtInput
                  name="value"
                  title="电话"
                  type="text"
                  placeholder="请输入电话"
                />
                <AtInput
                  name="value"
                  title="邮箱"
                  type="text"
                  placeholder="请输入邮箱"
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <AtButton
                  circle
                  type="primary"
                  onClick={() => {
                    setIsConserve(false);
                  }}
                >
                  取消
                </AtButton>
                <AtButton
                  circle
                  type="primary"
                  onClick={() => {
                    setIsOpened(false);
                    setIsConserve(false);
                    // 跳转到付款页面
                  }}
                >
                  付款
                </AtButton>
                <AtButton
                  circle
                  type="primary"
                  onClick={() => {
                    setIsConserve(false);
                    setIsOpened(false);
                    //
                  }}
                >
                  到店取货
                </AtButton>
              </View>
            </View>
          )}
          {!isConserve && (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <AtButton
                circle
                type="primary"
                onClick={() => {
                  console.log("留货");
                  setIsConserve(true);
                }}
              >
                留货
              </AtButton>
              <AtButton
                circle
                type="primary"
                onClick={() => {
                  console.log("不留");
                  setIsOpened(false);
                }}
              >
                不留
              </AtButton>
            </View>
          )}
        </AtModalContent>
      </AtModal>
    </View>
  );
};

export default Message;
