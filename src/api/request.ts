/*
 * @Author: your name
 * @Date: 2020-03-11 13:44:35
 * @LastEditTime: 2020-03-11 14:36:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/api/request.ts
 */

import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import qs from 'qs';
import { ResponseData, Options, RCancel, ABaseConfig, RequestFunc } from '@typings/axios';

// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?
//     AdminConfig.PRODUCTION_URL :
//     AdminConfig.DEV_URL;

// 初始化 设置钩子函数
let _before: (config: AxiosRequestConfig) => void = ()=>{},
    _error: (arg0: any) => void = () => { },
    _success: (arg0: AxiosResponse<ResponseData<any>>) => void = () => { },
    _complete: () => void = () => { };
export function init(options: any) {
    const defaultOptions = {
        before() { },
        error() { },
        success() { },
        complete() { }
    };
    options = Object.assign({}, defaultOptions, options);
    _before = options.before;
    _error = options.error;
    _success = options.success;
    _complete = options.complete;
}
function handleError(err: any) {
    const isCanceled = err && err.message && err.message.canceled;
    if (isCanceled) return;
    _error(err);
}

let cancels: RCancel[] = [];
const removeCancel = (ever: AxiosRequestConfig) => {
    const key = ever.url + '&' + ever.method;
    const index = cancels.findIndex(c => (c.u) === key);
    cancels[index].f(); // 执行取消操作
    cancels.splice(index, 1);
}

function setOptions(axiosInstance: AxiosInstance, isCancel: boolean) {
    // 添加请求拦截器
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            // 在发送请求之前做某事
            if (isCancel) {
                // 是否阻止同一个请求多次提交
                removeCancel(config);
            }
            _before(config);
            return config;
        },
        (error: AxiosError) => {
            // 请求错误时做些事
            // _error(error)
            _complete();
            return Promise.reject(error);
        }
    )
    // 添加响应拦截器，拦截登录过期或者没有权限
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse<ResponseData<any>>) => {
            console.log(response)
            const { data } = response;
            _success(response);
            _complete();
            return Promise.reject(response);
        },
        (error: AxiosError) => {
            _complete();
            handleError(error);
            return Promise.reject(error)
        }
    )
}

export default function fetch(options: Options = {}) {
    const { globalHandle = true, isTransformRequest = true, isCancel = false } = options;
    const CancelToken = axios.CancelToken;
    const config: AxiosRequestConfig = options;
    config.cancelToken = new CancelToken(c => cancels.push({
        u: options.url + '&' + options.method,
        f: c
    }))
    if (isTransformRequest) {
        config.transformRequest = [
            data => {
                data = qs.stringify(data);
                return data;
            }
        ];
    }
    const instance = axios.create(config);
    // 覆写axios的默认配置
    instance.defaults.headers = {
        'Content-Type': 'application/json;charset=utf-8',
        // 'post': {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // },
        // 'put': {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // },
        'get': {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        }
    };
    instance.defaults.timeout = 60000;
    instance.defaults.withCredentials = true;

    if (globalHandle) {
        setOptions(instance, isCancel);
    }
    return instance;
}

export function cancelFetches() {
    cancels.forEach(cancel => {
        cancel.f();
    });
    cancels = [];
}







