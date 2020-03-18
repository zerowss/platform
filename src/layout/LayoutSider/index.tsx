import React, { useState, useCallback } from "react";
import { Layout, Menu } from "antd";
import Icon, {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import "./index.less";
import MenuConfig from "../menuConfig";
import { Link } from "react-router-dom";
import {RouteConfigs, RouteMeta} from '../../typings/menuRouter'

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

function renderTitle(meta: RouteMeta) {
  return (
    <span className="menu-item-inner">
      {meta.icon && React.createElement(meta.icon)}
      <span className="menu-title"> {meta.title} </span>
    </span>
  );
}

function renderMenuRoute(menu: RouteConfigs) {
  return (
    <Item key={menu.key}>
      {menu.path ? (
        <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
      ) : (
        <span>{renderTitle(menu.meta)}</span>
      )}
    </Item>
  );
}

function renderSubMenu(menu: RouteConfigs) {
  return (
    <SubMenu title={renderTitle(menu.meta)} key={menu.key}>
      {menu.children!.map((item: RouteConfigs) =>
        item.children ? renderSubMenu(item) : renderMenuRoute(item)
      )}
    </SubMenu>
  );
}

function renderMenu(menu: RouteConfigs) {
  if (menu.children) {
    return renderSubMenu(menu);
  }

  return renderMenuRoute(menu);
}

const LayoutSider: React.FC = () => {
  const [collapsVal, setCollapsVal] = useState<boolean>(false);
  const onCollapse = useCallback(
    collapsed => {
      setCollapsVal(collapsed);
    },
    []
  );
  return (
    <>
      <Sider
        width={200}
        className="layout-sider"
        collapsible
        collapsed={collapsVal}
        onCollapse={onCollapse}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          defaultOpenKeys={[]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {MenuConfig.map(menu => renderMenu(menu))}
        </Menu>
      </Sider>
    </>
  );
};

export default LayoutSider;
