/*
 * @Author: your name
 * @Date: 2020-03-26 15:22:08
 * @LastEditTime: 2020-03-29 22:28:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/typings/app.ts
 */

import { RouteConfigs } from "./menuRouter";

export interface GPages extends RouteConfigs{
    // key: string;
    // meta:{
    //     title:string;
    //     icon?:string;
    // };
    // breadceumb: string[];
    child?: RouteConfigs
}

export interface GAppState{
    activeNav: GPages,
    opendPagesList: RouteConfigs | {}
}
