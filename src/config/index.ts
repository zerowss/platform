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

    layout?: 'side' | 'top';

    theme?: 'dark' | 'light';

    fixedHeader?: boolean;

    contentWidth?: 'fluid' | 'fixed';

    colorWeak?: boolean;

    title?: string;

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
    DEV_URL: 'http://112.126.98.4',

    // production请求地址
    PRODUCTION_URL: 'https://erp.t.iron.mlwplus.com',

    // 本地存储token 的key
    TOKEN_KEY: 'Admin_Token_key',

    // 默认主题颜色
    theme: 'dark'
    
}
