import axios from 'axios'

class HttpRequest {
    constructor() {
        this.baseURL = process.env_NODE_ENV = 'proction' ? '/' : 'http://localhost:8080';
        this.timeout = 3000;
        // 需要加loading
        this.queue = {} // 维护请求队列
        // 
    }
    request(options) {
        // 每次请求创建一个新实例
        const instance = axios.create();
        const config = {
            baseURL: this.baseURL,
            timeout: this.timeout,
            ...options
        };
        return instance(config)
    }
    get(url, data) {
        return this.request({
            url,
            method: 'get',
            ...data
        })
    }
    post(url, data) {
        return this.request({
            url,
            method: 'post',
            ...data
        })
    }
    setInterceptor(instance, url) {
        instance.interceptor.request.use((config) => {
            // 可以记录请求的取消函数
            const CancelToken = axios.CancelToken;
            config.cancelToken = new CancelToken((c) => {
                // c是当前取消请求的token
            })
            this.queue[url] = true
            return config;
        })

        instance.interceptor.response.use((res) => {
            delete this.queue[url];
            if (res.data.code === 0) {
                return res.data.data;
            } else {
                return Promise.reject(err);
            }
        }, (err) => {
            delete this.queue[url];
            return Promise.reject(err);
        })
    }
}

export default HttpRequest;