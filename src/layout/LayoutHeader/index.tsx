import React from "react";
import { Layout } from "antd";
import "./index.less";
import logoPic from '@assets/logo@3x.png';
import LayoutUserInfo from '../LayoutUserInfo/index';

const { Header } = Layout;



const LayoutHeader:React.FC = ()=>{
    return (
      <>
        <Header className="header">
          <div className="logo">
            <img src={logoPic} alt="logo" />
          </div>
          <div className="top-navigation">
            {/* <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu> */}
          </div>
          <LayoutUserInfo />
        </Header>
      </>
    );
}

export default LayoutHeader;
