import qs from 'qs'
import parseHeaders from 'parse-headers';
import { AxiosRequestConfig, AxiosResponse } from "./types";
import AxiosInterceptorManager, { Interceptors } from './AxiosInterceptorManager';

const defaults: AxiosRequestConfig = {
    method: "GET",
    timeout: 0,
    headers: {
        common: {
            accept: "application/json"
        }
    },
}
const getStyleMethods = ["get", "head", "delete", "options"];
getStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {};
});
const postStyleMethods = ["put", "post", "patch"];
postStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {
        "Content-Type": "application/json"
    }
});
const allMethods = [...getStyleMethods, ...postStyleMethods];


export default class Axios<T> {
    public defaults: AxiosRequestConfig = defaults;
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    request(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        config.headers = Object.assign(this.defaults.headers!, config.headers);
        const chain: Array<Interceptors<AxiosRequestConfig> | Interceptors<AxiosResponse<T>>> = [{
            onFullfilled: this.dispatchRequest
        }];
        this.interceptors.request.interceptors.reverse().forEach((interceptor: Interceptors<AxiosRequestConfig> | null) => {
            interceptor && chain.unshift(interceptor);
        });
        this.interceptors.response.interceptors.forEach((interceptor: Interceptors<AxiosResponse<T>> | null) => {
            interceptor && chain.push(interceptor);
        });

        let promise: any = Promise.resolve(config);
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
                    if (key === "common" || allMethods.indexOf(key) !== -1) {
                        if (key === "common" || config.method === key) {
                            for (const k in headers[key]) {
                                request.setRequestHeader(k, headers[key][k]);
                            }
                        }
                    } else {
                        request.setRequestHeader(key, headers[key]);
                    }
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
            if (config.CancelToken) {
                config.CancelToken.then((message: string) => {
                    request.abort();
                    reject(message);
                })
            }
            request.send(body);
        })
    }
}