import React from "react";
import { Row, Col } from "antd";
import "./index.less";
import { useDispatch } from "react-redux";
import Localstorage from "@utils/storage";
import { UserState } from "@typings/userInfo";
import { userout } from "@store/module/user";
import { removeCookie } from "@utils/cookis";
import { useHistory } from "react-router-dom";
import request from "@api/index";
import { userOutApi } from "./api";
import avg from "@assets/avg.png";

const LayoutUserInfo: React.FC = () => {
  const history = useHistory();
  const userInfo = Localstorage.getValue<UserState>("userInfo");
  const name = userInfo ? userInfo.username : "";
  const roleName = userInfo ? userInfo.name : "";

  const dispatch = useDispatch();

  function loginOut() {
    request(userOutApi, {
      onSuccess: () => {
        dispatch(userout());
        Localstorage.removeValue("userInfo");
        removeCookie("token");
        history.push("/login");
      }
    });
  }

  return (
    <>
      <div className="user-info">
        <Row>
          <Col flex="36px">
            <div className="avatar">
              <img src={avg} alt="avatar" />
            </div>
          </Col>
          <Col flex="auto" style={{ marginLeft: "10px" }}>
            <div className="user-name">
              <span>{name}</span>
              <span>{roleName}</span>
            </div>
            <div className="user-btn">
              <a onClick={e => e.preventDefault()}>操作日志</a>
              <a onClick={loginOut}>退出</a>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LayoutUserInfo;
