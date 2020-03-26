import { ResponseData, ABaseConfig } from "@typings/axios";
import { AxiosResponse } from "axios";

export default async function request<T>(fn: () => Promise<AxiosResponse<ResponseData<T>>>, baseconfig: ABaseConfig<T>): Promise<AxiosResponse<ResponseData<T>>> {
    let response!: AxiosResponse<ResponseData<T>>;
    const {
        onBefore = () => { },
        onSuccess = () => { },
        onError = () => { },
        onFinally = () => { }
    } = baseconfig;
    try {
        onBefore();
        response = await fn();
        onSuccess(response.data.data);
    } catch (e) {
        onError(e);
    } finally {
        onFinally();
    }
    return response;
}
