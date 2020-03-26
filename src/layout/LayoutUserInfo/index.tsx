import React from "react";
import { Button, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.less";
import { useDispatch, useSelector } from "react-redux";
import Localstorage from "@utils/storage";
import { UserState } from "@typings/userInfo";
import { userout } from "@store/module/user";


const LayoutUserInfo: React.FC = () => {
  const userInfo = Localstorage.getValue<UserState>("userInfo");
  const name = userInfo ? userInfo.name: '';

  const dispatch = useDispatch();

  function loginOut() {
    dispatch(userout());
    Localstorage.removeValue("userInfo");
  }


  return (
    <>
      <div className="user-info">
        <Row gutter={16}>
          <Col flex="40px">
            <Avatar icon={<UserOutlined />} />
          </Col>
          <Col flex="auto">
            <div className="user-name">{name || "admin"}</div>
            <div className="user-btn">
              <Button type="link" onClick={e => e.preventDefault()}>
                操作日志
              </Button>
              <Button type="link" onClick={loginOut}>
                退出
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LayoutUserInfo;
