import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from 'react-redux';
import { IStoreState } from "@store/types";

function PrivateRoute(parameter:any) {
  const { component, isLogin, location, ...rest } = parameter;
  const Component: any = component;
  console.log(parameter, "PrivateRoute");
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
