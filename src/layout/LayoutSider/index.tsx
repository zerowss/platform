import React, { useState, useCallback, memo, useEffect } from "react";
import { Layout, Menu } from "antd";
import "./index.less";
import MenuConfig from "../../router/menuConfig";
import { Link } from "react-router-dom";
import { RouteConfigs, RouteMeta } from "../../typings/menuRouter";
import { ClickParam } from "antd/lib/menu";
import { useSelector, useDispatch } from "react-redux";
import { IStoreState } from "@store/types";
import { setAppActive } from "@store/module/app";
import logoPic from "@assets/logo@3x.png";
import logoPicMini from '@assets/logo@3x_mini.png';
import { GPages } from "@typings/app";

import { createFromIconfontCN } from "@ant-design/icons";
import { getUserRoutesAsync } from "@store/module/app";

const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1728101_h6sfouwyp9b.js"
});

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

function renderTitle(menu: RouteConfigs) {
  return (
    <span className="menu-item-inner">
      {/* {menu.icon && React.createElement(menu.icon)} */}
      {menu.icon && <MyIcon type={menu.icon} />}
      <span className="menu-title"> {menu.title} </span>
    </span>
  );
}

function renderMenuRoute(menu: RouteConfigs) {
  return (
    <Item key={menu.id}>
      {menu.path && menu.menu ? (
        <Link to={menu.path}>{renderTitle(menu)}</Link>
      ) : (
        <span>{renderTitle(menu)}</span>
      )}
    </Item>
  );
}

function renderSubMenu(menu: RouteConfigs) {
  return (
    <SubMenu title={renderTitle(menu)} key={menu.id}>
      {menu.children!.map((item: RouteConfigs) =>
        item.children && item.children.length
          ? renderSubMenu(item)
          : renderMenuRoute(item)
      )}
    </SubMenu>
  );
}

function renderMenu(menu: RouteConfigs) {
  if (menu.children && menu.children.length) {
    return renderSubMenu(menu);
  }

  return renderMenuRoute(menu);
}

function getMenu(pKey: string, childkey: string | null) {
  const pMenu: GPages = MenuConfig.find(m => String(m.id) === pKey)!;
  pMenu.breadceumb = [pMenu.title];
  if (childkey && pMenu) {
    if (pMenu.children && pMenu.children.length) {
      const childMenu: RouteConfigs = pMenu.children.find(
        m => String(m.id) === childkey
      )!;
      pMenu.breadceumb = [pMenu.title, childMenu.title];
      pMenu.child = childMenu;
      return pMenu;
    }
  }
  return pMenu;
}

const LayoutSider: React.FC = () => {
  const { activeNav, userRoutes } = useSelector(
    (state: IStoreState) => state.app
  );
  const dispatch = useDispatch();
  const rootSubmenuKeys = MenuConfig.map(m => String(m.id));
  const initNav = String(activeNav.id) ? String(activeNav.id) : "1"; // 默认首页
  let initSub: string[] = [];
  if (activeNav.child && String(activeNav.child.id)) {
    initSub = [String(activeNav.child.id)];
  }
  const [collapsVal, setCollapsVal] = useState<boolean>(false);
  const [openKeys, setopenKeys] = useState<string[]>([initNav]);
  const [selectedKeys, setselectedKeys] = useState<string[]>(initSub);

  const onCollapse = useCallback(collapsed => {
    setCollapsVal(collapsed);
  }, []);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)!;
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setopenKeys(keys);
    } else {
      setopenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onMenuClick = ({ keyPath }: ClickParam) => {
    const pKey = keyPath.length === 1 ? keyPath[0] : keyPath[1];
    const childkey = keyPath.length === 1 ? null : keyPath[0];
    const checkedNav = getMenu(pKey, childkey);
    dispatch(setAppActive(checkedNav));
    setopenKeys([pKey]);
    setselectedKeys(childkey ? [childkey] : []);
    if (checkedNav.key === "1") {
      setopenKeys([]);
      setselectedKeys([]);
    }
  };

  // 更新路由
  useEffect(() => {
    console.log("update");
    const action = getUserRoutesAsync();
    dispatch(action);
  }, [dispatch]);

  return (
    <>
      <Sider
        width={180}
        className="layout-sider"
        collapsible
        collapsed={collapsVal}
        onCollapse={onCollapse}
      >
        <div className={collapsVal ? "logo logo-mini" : "logo"}>
          <img
            src={logoPic}
            alt="logo"
          />
        </div>
        <div className="sideMenuWrap">
          <Menu
            className="sideMenu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[]}
            defaultOpenKeys={[]}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            onClick={onMenuClick}
            style={{ height: "100%", borderRight: 0 }}
          >
            {userRoutes.map(menu => renderMenu(menu))}
          </Menu>
        </div>
      </Sider>
    </>
  );
};

export default memo(LayoutSider);
