/*
 * @Author: your name
 * @Date: 2020-03-16 16:49:12
 * @LastEditTime: 2020-03-29 15:42:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/typings/menuRouter.ts
 */
import {RouteProps} from 'react-router-dom'
import Breadceumb from '../layout/Breadcrumb/index';
export interface RouteBase extends RouteProps {
    path?: string;
    // 302 跳转
    redirect?: string;
    // 路由信息
    meta: RouteMeta;
    // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
    auth?: boolean;
    // 权限
    key?: string;
    // 层级
    keyPath?: string[],
    // 面包屑
    breadceumb?: string[]
}

export interface RouteMeta {
    title: string;
    icon?: any
}

// children 增加自定义
export interface RouteConfigs extends RouteBase {
    children?: RouteConfigs[];
}
