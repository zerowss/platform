
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
} from "@ant-design/icons";

import { RouteConfigs } from '../typings/menuRouter';

const MenuConfig: RouteConfigs[] = [
    {
        key: '1',
        meta: {
            title: '首页',
            icon: NotificationOutlined
        },
        path: '/first-page'
    },
    {
        key: '2',
        meta: {
            title: '管理',
            icon: LaptopOutlined
        },
        children: [
            {
                key: '2-1',
                meta: {
                    title: '管理1'
                },
                path: '/todoList'
            },
            {
                key: '2-2',
                meta: {
                    title: '管理2'
                },
                path: '/detail'
            }
        ]
    },
    {
        key: '3',
        meta: {
            title: '系统管理',
            icon: LaptopOutlined
        },
        children: [
            {
                key: '3-1',
                meta: {
                    title: '用户管理'
                },
                path: '/system-management/user-management'
            },
            {
                key: '3-2',
                meta: {
                    title: '角色管理'
                },
                path: '/system-management/role-management'
            }
        ]
    }
]

export default MenuConfig;
