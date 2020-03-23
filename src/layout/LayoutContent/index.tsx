import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import "./index.less";
import Loading from "@components/loading";
import mainRoutes from "@router/mainRoutes";
import PrivateRoute from "@components/PrivateRoute";

const LayoutContent: React.FC = () => {
  return (
    <div className="content-wrap">
      <Suspense fallback={<Loading />}>
        <Switch>
          {mainRoutes.map((r, index) => (<PrivateRoute key={index} />))}
        </Switch>
      </Suspense>
    </div>
  );
};

export default LayoutContent;
