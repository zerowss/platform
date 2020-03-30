/*
 * @Author: your name
 * @Date: 2020-03-26 09:49:00
 * @LastEditTime: 2020-03-27 16:44:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/api/index.ts
 */
import { ResponseData, ABaseConfig } from "@typings/axios";
import { AxiosResponse } from "axios";

export default async function request<T>(fn: () => Promise<AxiosResponse<ResponseData<T>>>, baseconfig: ABaseConfig<T>): Promise<AxiosResponse<ResponseData<T>>> {
    /* eslint-disable   prefer-const */
    let response!: AxiosResponse<ResponseData<T>>;
    const {
        onSuccess = () => { },
        onError = () => { },
    } = baseconfig;
    response = await fn();
    const { data, status } = response;
    if (status === 200) {
        if (data.code == 0) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
    }
    return response;
}
