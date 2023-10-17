import axios, { AxiosResponse, AxiosRequestConfig } from "./axios";

const baseURL = "http://localhost:8080";

interface User {
    name: string;
    password: string;
}
let user: User = {
    "name": "xxyCoder",
    "password": "123456"
}

// 拦截器
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers && (config.headers.name += '1');
    return config;
}, (err: any) => Promise.reject(err));
let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers && (config.headers.name += "2");
    return config;
})
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    return new Promise(resolve => {
        setTimeout(() => {
            config.headers && (config.headers.name += "3");
            resolve(config);
        }, 2000);
    })
})
axios.interceptors.request.eject(request);

axios.interceptors.response.use((response: AxiosResponse) => {
    response.data = JSON.parse(response.data);
    return response;
}, (err: any) => Promise.reject(err));
let response = axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += "2";
    return response;
})
axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += "3";
    return response;
})
axios.interceptors.response.eject(response);

// cancelToken
const cancelToken = axios.cancelToken;
const isCancel = axios.isCancel;
const source = cancelToken.source();

// GET请求
// axios<User>({
//     method: "GET",
//     url: baseURL + "/get",
//     params: user
// })
//     .then((response: AxiosResponse<User>) => {
//         console.log("response:", response);
//         return response.data;
//     })
//     .then((data: User) => {
//         console.log("data:", data);
//     })
//     .catch((err: any) => {
//         console.log(err);
//     })

// POST请求
axios<User>({
    method: "POST",
    url: baseURL + "/post",
    data: user,
    headers: {
        "Content-Type": "application/json",
        "name": "xxyCoder"
    },
    CancelToken: source.token
})
    .then((response: AxiosResponse<User>) => {
        console.log("response:", response);
        return response.data;
    })
    .catch((err: any) => {
        console.log(err);
    })

    // source.cancel("取消");

// 超时错误
// axios<User>({
//     method: "POST",
//     url: baseURL + "/post_timeout?timeout=2000",
//     data: user,
//     headers: {
//         "Content-Type": "application/json"
//     },
//     timeout: 1000
// })
//     .then((response: AxiosResponse<User>) => {
//         console.log("response:", response);
//         return response.data;
//     })
//     .then((data: User) => {
//         console.log("data:", data);
//     })
//     .catch((err: any) => {
//         console.log(err);
//     })

// code
// axios<User>({
//     method: "POST",
//     url: baseURL + "/post_state?code=400",
//     data: user,
//     headers: {
//         "Content-Type": "application/json"
//     }
// })
//     .then((response: AxiosResponse<User>) => {
//         console.log("response:", response);
//         return response.data;
//     })
//     .then((data: User) => {
//         console.log("data:", data);
//     })
//     .catch((err: any) => {
//         console.log(err);
//     })