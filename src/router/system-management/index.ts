import * as React from "react";
import { RouteProps } from "react-router-dom";

const { lazy } = React;

const RoleManagement = lazy(() =>
    import(/* webpackChunkName:"roleManagement" */ "@views/system-management/role-management/index")
);
const UserManagement = lazy(() =>
    import(/* webpackChunkName:"userManagement" */ "@views/system-management/user-management/index")
);
const RouteAdd = lazy(() =>
    import(/* webpackChunkName:"routeAdd" */ "@views/system-management/route-add/index")
);
const RouteList = lazy(() =>
    import(/* webpackChunkName:"routeList" */ "@views/system-management/route-list/index")
);
const PowerList = lazy(() =>
    import(/* webpackChunkName:"powerList" */ "@views/system-management/power-list/index")
);


const systemManagementRoutes: RouteProps[] = [
    {
        path: "/system-management/role-management",
        exact: true,
        component: RoleManagement
    },
    {
        path: "/system-management/user-management",
        exact: true,
        component: UserManagement
    },
    {
        path: "/system-management/route-add",
        exact: true,
        component: RouteAdd
    },
    {
        path: "/system-management/route-list",
        exact: true,
        component: RouteList
    },
    {
        path: "/system-management/power-list",
        exact: true,
        component: PowerList
    }
];

export default systemManagementRoutes;
