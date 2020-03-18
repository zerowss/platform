/*
 * @Author: your name
 * @Date: 2020-03-11 14:24:38
 * @LastEditTime: 2020-03-11 14:34:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/config/index.ts
 */
export interface Config {
    BASENAME?: string;

    SUCCESS_CODE: number;

    LOGIN_EXPIRE: number;

    DEV_URL: string;

    PRODUCTION_URL: string;

    TOKEN_KEY: string;

    layout: 'side' | 'top';

    theme: 'dark' | 'light';

    fixedHeader: boolean;

    contentWidth: 'fluid' | 'fixed';

    colorWeak: boolean;

    title: string;

    logo?: string;
}

export const AdminConfig: Config = {
    // react-router basename
    BASENAME: '/phecda',

    // 请求成功状态码
    SUCCESS_CODE: 200,

    // 登录过期，或者未登录
    LOGIN_EXPIRE: 400,

    // dev请求地址
    DEV_URL: 'https://erp.t.iron.mlwplus.com',

    // production请求地址
    PRODUCTION_URL: 'https://erp.t.iron.mlwplus.com',

    // 本地存储token 的key
    TOKEN_KEY: 'Admin_Token_key',

    // 默认菜单栏位置
    layout: 'side',

    // 默认主题颜色
    theme: 'dark',

    // 是否固定头部
    fixedHeader: false,

    // 固定宽度或者流式宽度
    contentWidth: 'fixed',

    // 是否开启色弱模式
    colorWeak: false,

    // 项目名称
    title: 'React Ant Admin',

    // logo
}
