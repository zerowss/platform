import * as React from "react";
import { RouteProps } from "react-router-dom";
import mainRoutes from './mainRoutes';



const { lazy } = React;

const Login = lazy(() =>
    import(/* webpackChunkName:"login" */ "@views/login")
);
const Home = lazy(() => import(/* webpackChunkName:"Home" */ "@layout/Home"));

const staticRoutes: RouteProps[] = [
    {
        path: "/login",
        exact: true,
        component: Login
    },
    {
        path: "/index",
        exact: true,
        component: Home,
        children: mainRoutes
    },
    {
        path: "/",
        component: Home
    }
];

export default staticRoutes;
