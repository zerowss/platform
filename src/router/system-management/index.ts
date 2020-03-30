import * as React from "react";
import { RouteProps } from "react-router-dom";

const { lazy } = React;

const RoleManagement = lazy(() =>
    import(/* webpackChunkName:"roleManagement" */ "@views/system-management/role-management/index")
);
const UserManagement = lazy(() =>
    import(/* webpackChunkName:"userManagement" */ "@views/system-management/user-management/index")
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
    }
];

export default systemManagementRoutes;
