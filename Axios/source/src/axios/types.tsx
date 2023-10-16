import AxiosInterceptorManager from "./AxiosInterceptorManager";

export type Methods = 'GET' | 'get' | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE" | "options" | "OPTIONS";

export interface AxiosRequestConfig {
    url?: string;
    method?: Methods;
    params?: any;
    headers?: Record<string, string>;
    data?: Record<string, any>;
    timeout?: number
}

// Promise<T>中的T是resolve的值
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    }
}

// 泛型T代表响应体类型
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers?: Record<string, string>;
    config?: AxiosRequestConfig;
    request?: XMLHttpRequest;
}