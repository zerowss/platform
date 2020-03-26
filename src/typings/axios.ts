import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ResponseData<T> {
    code: number,
    data: T,
    msg?: string
}

export interface Options extends AxiosRequestConfig {
    globalHandle?: boolean,
    isTransformRequest?: boolean,
    isCancel?: boolean
}

export interface RCancel {
    f: any;
    u: string;
}

export interface ABaseConfig<T> {
    onBefore?: () => void;
    onSuccess?: (data: T) => void;
    onError?: (e: any) => void;
    onFinally?: () => void;
}

export interface RequestFunc<T> {
    (fn: () => Promise<AxiosResponse<ResponseData<T>>>, baseconfig: ABaseConfig<T>): Promise<AxiosResponse<ResponseData<T>>>
}
