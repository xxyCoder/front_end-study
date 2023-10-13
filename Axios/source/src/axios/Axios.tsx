import qs from 'qs'
import parseHeaders from 'parse-headers';
import { AxiosRequestConfig, AxiosResponse } from "./types";

export default class Axios {
    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.dispatchRequest(config);
    }
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            let { method, url, params } = config;
            const request = new XMLHttpRequest();
            if (params && typeof params === 'object') {
                // {name:"xxyCoder",age:21} ==> name=xxyCoder&age=21
                params = qs.stringify(params);
            }
            url += (url.indexOf("?") !== -1 ? '&' : '?') + params;
            request.open(method, url, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
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
                        reject("请求失败");
                    }
                }
            }
            request.send();
        })
    }
}