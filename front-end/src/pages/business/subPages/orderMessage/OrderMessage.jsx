import { View, Text, ScrollView } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import {
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtTabs,
  AtTabsPane,
  AtCard,
} from "taro-ui";

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

const OrderMessage = () => {
  useEffect(() => {
    Taro.createSelectorQuery()
      .select(".at-tabs__header")
      .boundingClientRect((rect) => {
        Taro.setStorageSync("tabsHeaderHeight", rect.height);
      })
      .exec();
  }, []);

  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const tabBarHeight = Taro.getStorageSync("tabBarHeight");
  const tabsHeaderHeight = Taro.getStorageSync("tabsHeaderHeight");

  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const isMessageListEmpty = messageList.length === 0;
  const [currentTab, setCurrentTab] = useState(0);
  const statusCategories = ["pending", "processing", "finalized"];

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
        alignContent: isMessageListEmpty ? "center" : "flex-start",
        justifyContent: isMessageListEmpty ? "center" : "flex-start",
      }}
    >
      {!isMessageListEmpty ? (
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
        <View>
          <Text>无消息</Text>
        </View>
      )}

      <AtModal isOpened={isOpened}>
        {selectedItem && <AtModalHeader>{selectedItem.title}</AtModalHeader>}

        <AtModalContent>
          <View>
            <Text>消息内容</Text>
            <View
              style={{ display: "flex", flexDirection: "row", bottom: "5px" }}
            >
              <AtButton
                circle
                type="primary"
                onClick={() => {
                  setIsOpened(false);
                }}
              >
                返回
              </AtButton>
              <AtButton
                circle
                type="primary"
                onClick={() => {
                  setIsOpened(false);
                }}
              >
                有货
              </AtButton>
              <AtButton
                circle
                type="primary"
                onClick={() => {
                  setIsOpened(false);
                }}
              >
                无货
              </AtButton>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    </View>
  );
};

export default OrderMessage;
