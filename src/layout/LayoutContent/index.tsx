import React, { Suspense } from "react";
import { Switch, Route, Redirect,withRouter } from "react-router-dom";
import "./index.less";
import Loading from "@components/loading";
import mainRoutes from "@router/mainRoutes";
// import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import Localstorage from "@utils/storage";
import { UserState } from "@typings/userInfo";

const LayoutContent: React.FC = (props:any) => {
  console.log(props);
  const userInfo = Localstorage.getValue<UserState>("userInfo");
  const isLogin: boolean = userInfo && userInfo.id ? true : false;
  // const isLogin: boolean = true;
  const { location } = props;
  const {pathname} = location;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Switch>
          {mainRoutes.map((r, index) => {
            const { path, exact, component } = r;
            if (isLogin) {
              if (path === "/login") {
                return <Redirect key={index} to="/" />;
              }
              return (
                <Route
                  key={index}
                  exact={exact}
                  path={path}
                  component={component}
                />
              );
            }
            return (
              <Redirect
                key={index}
                to={{
                  pathname: "/login",
                  state: { redirect: pathname } // 重定向地址
                }}
              />
            );
          })}
        </Switch>
      </Suspense>
    </>
  );
};

export default withRouter(LayoutContent);
