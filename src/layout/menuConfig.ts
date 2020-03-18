
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
        path: '/homepage'
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
    }
]

export default MenuConfig;
