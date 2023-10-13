export type Methods = 'GET' | 'get' | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE" | "options" | "OPTIONS";

export interface AxiosRequestConfig {
    url: string;
    method: Methods;
    params: any;
}

// Promise<T>中的T是resolve的值
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>
}

// 泛型T代表响应体类型
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers?: Record<string, string | string[]>;
    config?: AxiosRequestConfig;
    request?: XMLHttpRequest;
}