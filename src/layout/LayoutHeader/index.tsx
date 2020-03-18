import React from "react";
import { Layout, Menu, Dropdown, Button, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "./index.less";
const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const LayoutHeader:React.FC = ()=>{
    return (
      <>
        <Header className="header">
          <div className="logo" />
          <div className="top-navigation">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </div>
          <div className="user-info">
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button type="link" onClick={e => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} />
                wss <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Header>
      </>
    );
}

export default LayoutHeader;
