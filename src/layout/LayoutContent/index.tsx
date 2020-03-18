import React, { Suspense } from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
import routes from "../../router";
import "./index.less";
import Loading from "../../components/loading";

const LayoutContent: React.FC = () => {
  return (
    <div className="content-wrap">
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((r: RouteProps, index: number) => {
            const { path, exact, component } = r;
            const LazyCom = component;
            return (
              <Route key={index} exact path={path} component={component} />
            );
          })}
        </Switch>
      </Suspense>
    </div>
  );
};

export default LayoutContent;
