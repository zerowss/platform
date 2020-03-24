import { Route, Redirect, RouteProps } from "react-router-dom";
import React, { FC, useEffect } from "react";
import Localstorage from "@utils/storage";
import { UserState } from "@typings/userInfo";
import mainRoutes from "@router/mainRoutes";
import CacheRoute from "react-router-cache-route";

const PrivateRoute: FC = (appProps: any) => {
  const userInfo = Localstorage.getValue<UserState>("userInfo");
  // const isLogin: boolean = userInfo && userInfo.id ? true : false;
  const isLogin: boolean = true;
  const { location, ...rest } = appProps;
  const { pathname } = location;
  console.log(appProps, "PrivateRoute");
  console.log(userInfo);
  console.log("页面载入之前");
  useEffect(() => {
    console.log("页面载入完成");
  }, []);

  const targetRouterConfig = mainRoutes.find(
    (v: RouteProps) => v.path === pathname
  );

  return (
    <CacheRoute
      {...rest}
      render={props => {
        if (isLogin) {
          // 如果是登陆状态，想要跳转到登陆，重定向到主页
          if (pathname === "/login") {
            return <Redirect to="/" />;
          }
          if (targetRouterConfig) {
            const Component: any = targetRouterConfig.component;
            return <Component {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { redirect: pathname } // 重定向地址
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
