/*
 * @Author: your name
 * @Date: 2020-03-26 15:22:08
 * @LastEditTime: 2020-03-29 22:28:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/typings/app.ts
 */

export interface GPages{
    key?:string;
    meta:{
        title: string;
        icon?:string;
    }
    path?:string;
}

export interface GAppState{
    activeNav: GPages,
    opendPagesList: GPages[]
}
