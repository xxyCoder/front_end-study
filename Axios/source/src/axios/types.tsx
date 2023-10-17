import AxiosInterceptorManager from "./AxiosInterceptorManager";

export type Methods = 'GET' | 'get' | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE" | "options" | "OPTIONS";

export interface AxiosRequestConfig {
    url?: string;
    method?: Methods;
    params?: any;
    headers?: Record<string, any>;
    data?: Record<string, any>;
    timeout?: number;
    transformRequest?: (data: any, header: any) => any;
    transformResponse?: (data: any) => any;
    CancelToken?: any;
}

// Promise<T>中的T是resolve的值
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    },
    cancelToken: any;
    isCancel: any
}

// 泛型T代表响应体类型
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers?: Record<string, any>;
    config?: AxiosRequestConfig;
    request?: XMLHttpRequest;
}