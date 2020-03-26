import { useState, useEffect, useCallback, useRef } from 'react';
import request from '@api/index';
import { ABaseConfig, ResponseData } from '@typings/axios';
import { AxiosResponse } from 'axios';
interface BaseConfig<T> extends ABaseConfig<T> {
    manual?: boolean; //是否手动发起请求
    dependencies: any[];
}


export default async function useRequest<T>(fn: () => Promise<AxiosResponse<ResponseData<T>>>, baseconfig: BaseConfig<T>) {
    const {
        manual = false,
        onBefore = () => { },
        onSuccess = () => { },
        onError = () => { },
        onFinally = () => { },
        dependencies = []
    } = baseconfig;

    const [fetches, setFeches] = useState([]);
    const fetchesRef = useRef(fetches);
    fetchesRef.current = fetches;

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState();

    const run = ()=>{
        request(
            fn,
            {
                onBefore: () => {
                    setIsLoading(true);
                    onBefore();
                },
                onSuccess: (data) => {
                    setData(data);
                    onSuccess(data);
                },
                onError: (e) => {
                    setError(e);
                    onError(e);
                },
                onFinally: () => {
                    setIsLoading(false);
                    onFinally();
                }
            }
        )
    }

    // 根据传入的依赖项来执行请求
    if (!manual) {
        useEffect(() => {
            run()
        }, dependencies);
    }

    return {
        data,
        isLoading,
        error,
        run
    };

}
