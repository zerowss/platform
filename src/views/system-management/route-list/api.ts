/*
 * @Author: your name
 * @Date: 2020-03-31 16:22:11
 * @LastEditTime: 2020-04-02 17:52:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/views/system-management/route-list/api.ts
 */
import fetch from '@api/request';

export interface UserLoginData {
    tel: string;
    password: string;
}

export interface RouteParams {
    parent_id: string;
    title: string;
    path: string;
    icon: string;
    menu: string;
    order: number;
    permission: string;
    permission_id: string;
}

// 路由列表
export function getListApi() {
    return fetch().get('/api/admin-api/routers');
}

// 父级菜单下拉
export function getRoutesApi() {
    return fetch().get('/api/admin-api/routers/parent');
}

// 权限下拉
export function getPermissionApi() {
    return fetch().get('/api/admin-api/admin-permissions', { params: { all: 1 } });
}

interface PostForm{
    params?: RouteParams;
    id?: number
}
// 提交
export function postSubmitApi(method: 'post' | 'patch' | 'delete', ob: PostForm) {
    if (method === 'post'){
        return fetch().post('/api/admin-api/routers', ob.params);
    } else if (method === 'patch'){
        return fetch().patch('/api/admin-api/routers/' + ob.id, ob.params);
    }
    return fetch().delete('/api/admin-api/routers/' + ob.id);
}
