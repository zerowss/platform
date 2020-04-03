
// import {
//     UserOutlined,
//     LaptopOutlined,
//     NotificationOutlined,
//     HomeOutlined
// } from "@ant-design/icons";
// import * as Allicons from "@ant-design/icons";

import { RouteConfigs } from '@typings/menuRouter';
import { initRoutes} from './utils';

// const MenuConfig: RouteConfigs[] = [
    // {
    //     key: '1',
    //     meta: {
    //         title: '首页',
    //         icon: Allicons['HomeOutlined']
    //     },
    //     path: '/first-page'
    // },
    // {
    //     key: '2',
    //     meta: {
    //         title: '管理',
    //         icon: Allicons.LaptopOutlined
    //     },
    //     children: [
    //         {
    //             key: '2-1',
    //             meta: {
    //                 title: '管理1'
    //             },
    //             path: '/todoList'
    //         },
    //         {
    //             key: '2-2',
    //             meta: {
    //                 title: '管理2'
    //             },
    //             path: '/detail'
    //         }
    //     ]
    // },
    // {
    //     key: '3',
    //     meta: {
    //         title: '系统管理',
    //         icon: Allicons.NotificationOutlined
    //     },
    //     children: [
    //         {
    //             key: '3-1',
    //             meta: {
    //                 title: '用户管理'
    //             },
    //             path: '/system-management/user-management'
    //         },
    //         {
    //             key: '3-2',
    //             meta: {
    //                 title: '角色管理'
    //             },
    //             path: '/system-management/role-management'
    //         },
    //         {
    //             key: '3-3',
    //             meta: {
    //                 title: '添加路由'
    //             },
    //             path: '/system-management/route-add'
    //         },
    //         {
    //             key: '3-4',
    //             meta: {
    //                 title: '路由列表'
    //             },
    //             path: '/system-management/route-list'
    //         },
    //         {
    //             key: '3-5',
    //             meta: {
    //                 title: '权限列表'
    //             },
    //             path: '/system-management/power-list'
    //         }
    //     ]
    // }
// ]

const MenuConfig: RouteConfigs[] = initRoutes();
console.log(MenuConfig,'MenuConfig')
export default MenuConfig;
