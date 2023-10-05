const axios = require('axios')

// 向axios传递相关配置来创建请求
// 发起POST请求
axios({
    method: "post",
    url: "http://localhost:3000/user/123",
    data: {
        firstname: "xxy",
        lastname: "Coder"
    }
});
// 发起GET请求
axios({
    method: "GET",
    url: "http://localhost:3000",
    responseType: "stream"
})
    .then(response => {
    })
// 默认GET请求
axios("/user/123")

// 创建Axios实例
const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 3000,
})
// 自定义实例默认值
// 配置会按优先级进行合并
// 在lib/defaults.js中找到的库默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后面的优先级要高于前面的
instance.default.headers.common['Authorization'] = 'xxx'

// 拦截器
// 添加请求拦截器
const requestInterceptors = axios.interceptors.request.use(function (config) {
    // 在发送请求之前处理
    return config
}, function (err) {
    // 对请求错误处理
    return Promise.reject(err);
})

// 添加响应拦截器
const responseInterceptors = axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 移除拦截器
axios.interceptors.request.eject(requestInterceptors);
axios.interceptors.response.eject(responseInterceptors);

// 取消请求
const controller = new AbortController();
axios.get("/foo/bar", {
    signal: controller.signal
})
    .then(response => { });

controller.abort();

// 可以设置的请求配置
let cancel = null;
const options = {
    url: "/user",
    method: "get",
    baseURL: "http://localhost:3000/api",
    // 允许向服务器发送前修改请求数据
    // 只能适用于POST GET PATCH请求
    // 数组中最后一个函数必须返回字符串 Buffer实例 FormData或Stream
    // 可以修改请求头
    transformRequest: [function (data, headers) {
        // 对data进行处理
        return data
    }],
    // 在传递给then / catch前,修改响应数据
    transformResponse: [function (data) {
        return data;
    }],
    headers: {},
    // 与请求一起发送的URL参数,必须是一个简单对象或URLSearchParams对象
    params: {
        id: 123
    },
    // 作为请求体被发送的数据
    // 只能适用于POST GET PATCH请求
    data: {
        name: "xxyCoder"
    },
    // 发送请求体数据的可选语法
    // 请求方式 post
    // 只有 value 会被发送，key 则不会
    data: 'Country=Brasil&City=Belo Horizonte',
    // 如果请求时间超过 `timeout` 的值，则请求会被中断
    timeout: 1000, // 默认值是 `0` (永不超时)
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default
    responseType: 'json', // 默认值
    responseEncoding: 'utf8', // 默认值
    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
        // 处理原生进度事件
    },
    // `onDownloadProgress` 允许为下载处理进度事件
    // 浏览器专属
    onDownloadProgress: function (progressEvent) {
        // 处理原生进度事件
    },
    // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
    // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，则promise 将会 resolved，否则是 rejected。
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认值
    },
    cancelToken: new CancelToken(function (c) {
        cancel = c;
    }),
}
// 取消请求
cancel()