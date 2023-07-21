import { View, Image } from "@tarojs/components";
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { useSelector } from "react-redux";
import NavBar from "../../../components/navbar/NavBar";
import { AtAccordion } from "taro-ui";

const Help = () => {
  const systemInfo = useSelector((state) => state.systemInfo.systemInfo);
  const navBarHeight = Taro.getStorageSync("navBarHeight");
  const [isAcoordionOneOpened, setIsAcoordionOneOpened] = useState(false);
  const [isAcoordionTwoOpened, setIsAcoordionTwoOpened] = useState(false);
  const [isQuestionOneOpened, setIsQuestionOneOpened] = useState(false);
  const [isQuestionTwoOpened, setIsQuestionTwoOpened] = useState(false);
  const [isQuestionThreeOpened, setIsQuestionThreeOpened] = useState(false);

  return (
    <View>
      <NavBar title="帮助" systemInfo={systemInfo} root={false} />
      <View style={{ paddingTop: navBarHeight + "px" }}>
        <AtAccordion
          title="常见问题"
          open={isAcoordionOneOpened}
          onClick={() => setIsAcoordionOneOpened(!isAcoordionOneOpened)}
        >
          <AtAccordion
            title="# 问题一"
            open={isQuestionOneOpened}
            onClick={() => setIsQuestionOneOpened(!isQuestionOneOpened)}
          >
            <View
              style={{
                displayL: "flex",
                flexDirection: "column",
                width: "100wh",
                padding: "5px",
                background: "#e5e5e5",
              }}
            >
              help
            </View>
          </AtAccordion>
          <AtAccordion
            title="# 问题二"
            open={isQuestionTwoOpened}
            onClick={() => setIsQuestionTwoOpened(!isQuestionTwoOpened)}
          >
            <View
              style={{
                displayL: "flex",
                flexDirection: "column",
                width: "100wh",
                padding: "5px",
                background: "#e5e5e5",
              }}
            >
              help
            </View>
          </AtAccordion>
          <AtAccordion
            title="# 问题三"
            open={isQuestionThreeOpened}
            onClick={() => setIsQuestionThreeOpened(!isQuestionThreeOpened)}
          >
            <View
              style={{
                displayL: "flex",
                flexDirection: "column",
                width: "100wh",
                padding: "5px",
                background: "#e5e5e5",
              }}
            >
              help
            </View>
          </AtAccordion>
        </AtAccordion>
        <AtAccordion
          title="联系我们"
          open={isAcoordionTwoOpened}
          onClick={() => setIsAcoordionTwoOpened(!isAcoordionTwoOpened)}
        >
          <View
            style={{
              displayL: "flex",
              flexDirection: "column",
              width: "100wh",
              padding: "5px",
              background: "#e5e5e5",
            }}
          >
            <View className="at-article__p">电话：0600000000</View>
            <View className="at-article__p">邮箱：paris@ofvalue.company</View>
            <Image
              className="at-article__img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQAAAACoxAthAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAJcEhZcwAAFxEAABcRAcom8z8AAAHYSURBVHja7dtBboQwDEBRIxYsOQJH4WjD0TgKR2DJYoTbOA6B6bTqSB0apO8VInlZGcuEIPpyCAQCgUDeR2bJ0eoYVxkqXaRXqR+GIZCzyM2T9B7v1TrFGb3acO/DKwRSOFltxi0SiyGiSHwYArkQsTI+xedhFCvjEMgFiZVxDTW7gUCuRrx27xuSKhX03/cwEMhfkhxWk+/SvfqSCIH8P3mMOBqSf3w6DIEUS0IrMR2S38Ku23C1hFvrPvkhkNLIHDI93Btqm/YZXVxFQ48ioU9ujskPgRRJ7I2vi+MS9y5slRxN2s6AQM4hvhPsmezZm8atTFeqEMgVSJXnytZwSNq0GCXW5H1DAoGUSZZdb7wR2bY2mrwwBFIosYZka4ollvR98qv3KwqBnEY8k0XSTnCd+2Td7x1XEEjJxJN/Cndb1cMptW360+cFAimJHGMU8Rc/fx40lfHhuw92EEgRZM4ZnpPfe5R8tqc79skQSIHk5om/nbf05O81J788NCQQyLvJk2PAqxyj+7IRAYGUTOzTRpd+zUhZv/yU/BBIgWSMexdW2fclvfv+dzkIpBTiA8ff5ZpI5rBak4/FQyDFkhxOLPn3Z+CbuEoLgZxEXgwIBAKBvIl8ABWbxupyG/cQAAAAAElFTkSuQmCC"
              mode="widthFix"
            />
          </View>
        </AtAccordion>
      </View>
    </View>
  );
};

export default Help;
