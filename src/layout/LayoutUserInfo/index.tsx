import React from "react";
import { Menu, Dropdown, Button, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "./index.less";
import { useDispatch, useSelector } from "react-redux";
import Localstorage from "@utils/storage";
import { UserState } from "@typings/userInfo";


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

const LayoutUserInfo: React.FC = () => {
  const userInfo = Localstorage.getValue<UserState>("userInfo");
  const name = userInfo ? userInfo.name: '';
  return (
    <>
      <div className="user-info">
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button type="link" onClick={e => e.preventDefault()}>
            <Avatar icon={<UserOutlined />} />
            {name} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </>
  );
};

export default LayoutUserInfo;
