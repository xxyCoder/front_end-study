"use strict";

import InterceptorManager, { AxiosInterceptorManager, IHandler } from "./InterceptorManager";

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

interface AxiosInstanceConfig<D = any> {
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

    const requestInterceptorChain: [] = []
  }
}

export default Axios;