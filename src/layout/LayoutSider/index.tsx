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
import { GPages } from "@typings/app";

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

function getMenu(pKey: string, childkey: string | null) {
  const pMenu: GPages = MenuConfig.find(m => m.key === pKey)!;
  pMenu.breadceumb = [pMenu.meta.title];
  if (childkey && pMenu) {
    if (pMenu.children) {
      const childMenu: RouteConfigs = pMenu.children.find(
        m => m.key === childkey
      )!;
      pMenu.breadceumb = [pMenu.meta.title, childMenu.meta.title];
      pMenu.child = childMenu;
      return pMenu;
    }
  }
  return pMenu;
}

const LayoutSider: React.FC = () => {
  const { activeNav } = useSelector((state: IStoreState) => state.app);
  const dispatch = useDispatch();
  const rootSubmenuKeys = MenuConfig.map(m => m.key);
  const initNav = activeNav.key ? activeNav.key : "1"; // 默认首页
  let initSub: string[] = [];
  if (activeNav.child && activeNav.child.key) {
    initSub = [activeNav.child.key];
  }
  const [collapsVal, setCollapsVal] = useState<boolean>(false);
  const [openKeys, setopenKeys] = useState<string[]>([initNav]);
  const [selectedKeys, setselectedKeys] = useState<string[]>(initSub);

  const onCollapse = useCallback(collapsed => {
    setCollapsVal(collapsed);
  }, []);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
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
    setselectedKeys(childkey?[childkey]:[]);
    if (checkedNav.key === "1") {
      setopenKeys([]);
      setselectedKeys([])
    }
  };

  return (
    <>
      <Sider
        width={180}
        className="layout-sider"
        collapsible
        collapsed={collapsVal}
        onCollapse={onCollapse}
      >
        <div className="logo">
          <img src={logoPic} alt="logo" />
        </div>
        <Menu
          className="sideMenu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["3"]}
          defaultOpenKeys={["3-1"]}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
          onClick={onMenuClick}
          style={{ height: "100%", borderRight: 0 }}
        >
          {MenuConfig.map(menu => renderMenu(menu))}
        </Menu>
      </Sider>
    </>
  );
};

export default memo(LayoutSider);
