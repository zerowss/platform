/*
 * @Author: your name
 * @Date: 2020-04-01 10:28:20
 * @LastEditTime: 2020-04-02 17:37:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/router/utils.ts
 */
import LocalStore from "@utils/storage";
import { UserState } from "@typings/userInfo";
import { RouteConfigs } from '@typings/menuRouter';
import { getCookie } from "@utils/cookis";
import { getUserRoutesApi } from '@store/api';
const userRoutes = LocalStore.getValue<UserState>('userInfo');
console.log(userRoutes, 'userRoutes')


/**
 *  token 存在 从新获取路由列表数据 更新LocalStore
 *        不存在 走登录 正常获取 
 */

export function initRoutes(): RouteConfigs[] {
    if (userRoutes) {
        return userRoutes['user_routes'];
    }
    return [];

}
