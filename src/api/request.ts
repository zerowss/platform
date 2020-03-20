/*
 * @Author: your name
 * @Date: 2020-03-11 13:44:35
 * @LastEditTime: 2020-03-11 14:36:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/api/request.ts
 */

import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import { AdminConfig } from '../config';
import { message, Modal } from 'antd';



interface ResponseData<T> {
    code: number,
    data: T,
    msg: string
}

interface Options extends AxiosRequestConfig {
    globalHandle?: boolean,
    isTransformRequest?: boolean
}

const cancels = [];

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'post':{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    'put': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    'get': {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    }
};

// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?
//     AdminConfig.PRODUCTION_URL :
//     AdminConfig.DEV_URL;

axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = '';
        // 获取用户token，用于校验
        /* eslint-disable  no-param-reassign */
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
)

// 添加响应拦截器，拦截登录过期或者没有权限
axios.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => {
        console.log(response)
        const { data } = response;
        if (!data) {
            return Promise.reject(response);
        }
        // 登录已过期或者未登录
        if (data.code === AdminConfig.LOGIN_EXPIRE) {
            Modal.confirm({
                title: '系统提示',
                content: response.data.msg,
                okText: '重新登录',
                onOk() {
                    // store.dispatch(clearSideBarRoutes());
                    // store.dispatch(logout());
                    window.location.href = `${
                        window.location.origin
                        }/login`;
                },
                onCancel() { },
            });

            return Promise.reject(new Error(data.msg));
        }

        // 请求成功
        if (data.code === AdminConfig.SUCCESS_CODE) {
            return response.data as any;
        }

        // 请求成功，状态不为成功时
        message.error(response.data.msg);

        return Promise.reject(new Error(data.msg));

    },
    (error: AxiosError) => {
        console.log(error)
        return Promise.reject(error)
    }
)


export default function fetch(options: Options = {}) {
    const { globalHandle = true, isTransformRequest = true } = options;
    const CancelToken = axios.CancelToken;
    const config:AxiosRequestConfig = {};
    config.cancelToken = new CancelToken(c => cancels.push(c))
    if (isTransformRequest) {
        config.transformRequest = [
            data => {
                data = qs.stringify(data);
                return data;
            }
        ];
    }
    const instance = axios.create(options);
    return instance;
}




