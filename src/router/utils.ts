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
import * as React from "react";
import { existsSync } from 'fs';
const { lazy } = React;

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

export function lazyComponent(path:string) {
    return lazy(() =>
        import(/* webpackChunkName:"[request]" */ `@views/${path}`)
    );
}

// export function winPath(path: string) {
//     const isExtendedLengthPath = /^\\\\\?\\/.test(path);
//     if (isExtendedLengthPath) {
//         return path;
//     }

//     return path.replace(/\\/g, '/');
// }
// type FileType = 'javascript' | 'css';

// interface FGetFileOpts {
//     base: string;
//     type: FileType;
//     fileNameWithoutExt: string;
// }

// const extsMap: Record<FileType, string[]> = {
//     javascript: ['.ts', '.tsx', '.js', '.jsx'],
//     css: ['.less', '.sass', '.scss', '.stylus', '.css'],
// };


// export function getFile(opts: FGetFileOpts) {
//     const exts = extsMap[opts.type];
//     for (const ext of exts) {
//         const filename = `${opts.fileNameWithoutExt}${ext}`;
//         const path = winPath(join(opts.base, filename));
//         if (existsSync(path)) {
//             return {
//                 path,
//                 filename,
//             };
//         }
//     }
//     return null;
// }

/**
 * 
 * @param path  
 *  /system-management
 *  /system-management/power-list
 *  /system-management/power-list/:id
 *  /system-management/power-list/:id/setting
 */
export function getFilePath(path:string) {
    if(path){
        const _path = `/src/views${path}`;
        if (existsSync(_path)) {
            return true;
        }
    }
    return false;
}

export function getComponent() {
    if (userRoutes){
        const menuRoutes = userRoutes['user_routes'];

        const MenuConfig: RouteConfigs[] = [];
        menuRoutes.forEach((r,index)=>{
            if (r.path){
                r.component = lazyComponent(r.path);
                MenuConfig.push(r);
            }
        })
        console.log(MenuConfig,'MenuConfig====');
        return MenuConfig;
    }
    return [];
}

