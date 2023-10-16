import qs from 'qs'
import parseHeaders from 'parse-headers';
import { AxiosRequestConfig, AxiosResponse } from "./types";
import AxiosInterceptorManager, { Interceptors } from './AxiosInterceptorManager';

export default class Axios<T> {
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    request(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        const chain: Array<Interceptors<AxiosRequestConfig> | Interceptors<AxiosResponse<T>>> = [{
            onFullfilled: this.dispatchRequest
        }];
        this.interceptors.request.interceptors.reverse().forEach((interceptor: Interceptors<AxiosRequestConfig> | null) => {
            interceptor && chain.unshift(interceptor);
        });
        this.interceptors.response.interceptors.forEach((interceptor: Interceptors<AxiosResponse<T>> | null) => {
            interceptor && chain.push(interceptor);
        });

        let promise: Promise<AxiosRequestConfig | AxiosResponse<T>> = Promise.resolve(config);
        while (chain.length > 0) {
            const { onFullfilled, onRejected } = chain.shift()!;
            promise = promise.then(onFullfilled, onRejected);
        }
        return promise;
    }
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            let { method = "GET", url, params, headers, data, timeout } = config;
            const request = new XMLHttpRequest();
            if (params) {
                // {name:"xxyCoder",age:21} ==> name=xxyCoder&age=21
                params = qs.stringify(params);
                url += (url!.indexOf("?") !== -1 ? '&' : '?') + params;
            }
            request.open(method, url!, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status !== 0) {
                    if (request.status >= 200 && request.status < 300) {
                        const response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        resolve(response);
                    } else {
                        reject(`Error: Request failed with status of code ${request.status}`);
                    }
                }
            }
            if (headers) {
                for (const key in headers) {
                    request.setRequestHeader(key, headers[key]);
                }
            }
            let body: string | null = null;
            if (data) {
                body = JSON.stringify(data);
            }
            if (timeout) {
                request.timeout = timeout;
                request.ontimeout = function () {
                    reject(`Error:timeout of ${timeout}ms exceeded`);
                }
            }
            request.onerror = function () {
                reject("net:ERR_INTERNET_DISCONNECTED");
            }
            request.send(body);
        })
    }
}