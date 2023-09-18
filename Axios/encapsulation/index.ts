import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface HData<T> {
    data: T;
    code: number;
    message: string
}

interface InterceptorHooks {
    requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
    responseInterceptorCatch?: (error: any) => any;
}

class HttpRequest {
    config: AxiosRequestConfig;
    instance: AxiosInstance;
    interceptorHooks?: InterceptorHooks;
    constructor(options: AxiosRequestConfig) {
        this.config = options;
        this.instance = axios.create(options);
    }
    // T决定AxiosResponse中data的类型
    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance
                .request<any, HData<T>>({
                    ...config, cancelToken: new axios.CancelToken((c) => {
                        // c是取消函数
                    })
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'GET' });
    }
    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'POST' });
    }
    setupInterceptor(): void {
        this.instance.interceptors.request.use(
            this.interceptorHooks?.requestInterceptor,
            this.interceptorHooks?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptorHooks?.responseInterceptor,
            this.interceptorHooks?.responseInterceptorCatch
        )

        this.instance.interceptors.request.use((config) => {
            //设置loading

            return config
        })

        this.instance.interceptors.response.use(
            (res) => {
                // 请求完毕，关闭loading

                return res
            },
            (err) => {
                // 请求完毕，关闭loading

                return err
            }
        )
    }
}

export default HttpRequest;