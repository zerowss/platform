/*
 * @Author: your name
 * @Date: 2020-03-13 10:56:41
 * @LastEditTime: 2020-03-13 10:57:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/router/index.ts
 */
import * as React from "react";
import { RouteProps } from "react-router-dom";
import systemManagementRoutes from "./system-management/index";

const { lazy } = React;

const FirstPage = lazy(() =>
  import(/* webpackChunkName:"firstPage" */ "../views/firstpage")
);

const TodoList = lazy(() =>
  import(/* webpackChunkName:"todolist" */ "../views/todolist")
);

const Detail = lazy(() =>
  import(/* webpackChunkName:"detail" */ "../views/detail")
);

const NoFoundPage = lazy(() =>
  import(/* webpackChunkName:"404" */ "../components/404")
);

let mainRoutes: RouteProps[] = [
  {
    path: "/index",
    exact: true,
    component: FirstPage
  },
  {
    path: "/todoList",
    exact: true,
    component: TodoList
  },
  {
    path: "/detail",
    exact: true,
    component: Detail
  },
  {
    path: "/",
    exact: true,
    component: FirstPage
  },
  {
    path: "*",
    exact: false,
    component: NoFoundPage
  }
];

mainRoutes = [...systemManagementRoutes, ...mainRoutes];

export default mainRoutes;
