"use strict";

import InterceptorManager, { AxiosInterceptorManager, IFulfilled, IHandler, IRejected } from "./InterceptorManager";
import dispatchRequest from "./dispatchRequest";

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export interface ProxyConfig {
  host: string;
  port: number;
  auth?: { username: string; password: string };
  protocol?: string
}

export interface Cancel {
  message?: string;
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel;
}

export interface GenericAbortSignal {
  readonly aborted: boolean;
  onabort?: ((...args: any) => any) | null;
  addEventListener?: (...args: any) => any;
  removeEventListener?: (...args: any) => any;
}

export interface AxiosInstanceConfig<D = any> {
  url?: string;
  method?: Method | string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: any;
  data?: D;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: ResponseType;
  proxy?: false | ProxyConfig;
  cancelToken?: CancelToken;
  signal?: GenericAbortSignal
}

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, any>;
  config: AxiosInstanceConfig<D>,
  request?: any
}

class Axios {
  private defaults: Record<string, any>;
  private interceptors: { request: AxiosInterceptorManager<AxiosInstanceConfig>, response: AxiosInterceptorManager<AxiosResponse> }
  constructor(instanceConfig?: AxiosInstanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager<AxiosInstanceConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  request(configOrUrl?: AxiosInstanceConfig | string, config?: AxiosInstanceConfig) {
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = Object.assign(this.defaults, config)
    if (!config.method) {
      config.method = 'get'
    }

    const requestInterceptorChain: (IFulfilled<AxiosInstanceConfig> | IRejected | undefined)[] = [];
    this.interceptors.request.forEach(interceptor => {
      if (interceptor) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      }
    })

    const responseInterceptorCahin: (IFulfilled<AxiosResponse> | IRejected | undefined)[] = [];
    this.interceptors.response.forEach(interceptor => {
      if (interceptor) {
        responseInterceptorCahin.push(interceptor.fulfilled, interceptor.rejected);
      }
    })

    let i = 0, len = requestInterceptorChain.length, promise, newConfig = config;
    while (i < len) {
      const onFulfilled = typeof requestInterceptorChain[i] === 'function' ? requestInterceptorChain[i] : (config: AxiosInstanceConfig) => config;
      ++i;
      const onRejected = typeof requestInterceptorChain[i] === 'function' ? requestInterceptorChain[i] : (err:any) => err;
      ++i;

      try {
        newConfig = onFulfilled!(newConfig);
      } catch(err) {
        onRejected!.call(this, err);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig)
    } catch(err) {
      return Promise.reject(err);
    }
    i = 0, len = responseInterceptorCahin.length;
    while (i < len) {
      promise = promise.then(responseInterceptorCahin[i++], responseInterceptorCahin[i++]);
    }

    return promise;
  }
}

export default Axios;