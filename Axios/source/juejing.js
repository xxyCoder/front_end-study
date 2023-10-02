class Axios {
    constructor() {
        this.interceptors = {
            request: new InterceptorsManage(),
            response: new InterceptorsManage()
        }
    }
    request(config) {
        const chain = [this._sendAjax.binf(this), undefined]; // 成功和失败成对出现
        // 请求拦截
        this.interceptors.request.handlers.forEach(interceptor => {
            chain.unshift(interceptor.fullfilled, interceptor.reject);
        })
        // 响应拦截
        this.interceptors.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fullfilled, interceptor.reject);
        })

        // 执行队列
        const promise = Promise.resolve(config);
        while (chain.length > 0) {
            promise = promise.then(chain.shift(), chain.unshift());
        }
        return promise;
    }
    _sendAjax(config) {
        return new Promise((resolve, reject) => {
            const { url = "", method = "GET", data = null } = config;
            // 发送请求
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function () {
                resolve(xhr.responseText);
            }
            xhr.send(data)
        })
    }
}

// 定义在原型上
const methods = ["get", "post", "head", "delete", "options", "put", "patch"];
methods.forEach(method => {
    Axios.prototype[method] = function () {
        if (["get", "delete", "head", "options"].includes(method)) {    // 需要两个参数 (url[,config])
            return this.request({
                method,
                url: arguments[0],
                ...arguments[1] || {}
            })
        } else {    // 需要三个参数 (url[,data][,config])
            return this.request({
                method,
                url: arguments[0],
                data: arguments[1],
                ...arguments[2] || {}
            })
        }
    }
})

const utils = {
    extend(a, b, context) {
        for (const key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context);
                } else {
                    a[key] = b[key]
                }
            }
        }
    }
}

function CreateAxiosFn() {
    const axios = new Axios();
    const req = axios.request.bind(axios);
    // 使得axios.get等操作也可以使用
    utils.extend(req, Axios.prototype, axios);
    // 给request绑定拦截器
    utils.extend(req, axios);
    return req;
}

const axios = CreateAxiosFn();
// 添加拦截器
class InterceptorsManage {
    constructor() {
        this.handlers = [];
    }
    use(fullfilled, rejected) {
        this.handlers.push({
            fullfilled,
            rejected
        });
    }
}