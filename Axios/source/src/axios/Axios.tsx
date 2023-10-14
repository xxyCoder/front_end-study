import qs from 'qs'
import parseHeaders from 'parse-headers';
import { AxiosRequestConfig, AxiosResponse } from "./types";

export default class Axios {
    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.dispatchRequest(config);
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