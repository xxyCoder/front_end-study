import axios, { AxiosResponse } from "./axios";

const baseURL = "http://localhost:8080";

interface User {
    name: string;
    password: string;
}
let user: User = {
    name: "xxyCoder",
    password: "123456"
}
// GET请求
axios<User>({
    method: "GET",
    url: baseURL + "/get",
    params: user
})
    .then((response: AxiosResponse<User>) => {
        console.log("response:", response);
        return response.data;
    })
    .then((data: User) => {
        console.log("data:", data);
    })
    .catch((err: any) => {
        console.log(err);
    })

// POST请求
axios<User>({
    method: "POST",
    url: baseURL + "/post",
    data: user,
    headers: {
        "Content-Type": "application/json"
    }
})
    .then((response: AxiosResponse<User>) => {
        console.log("response:", response);
        return response.data;
    })
    .then((data: User) => {
        console.log("data:", data);
    })
    .catch((err: any) => {
        console.log(err);
    })

// 超时错误
axios<User>({
    method: "POST",
    url: baseURL + "/post_timeout?timeout=2000",
    data: user,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 1000
})
    .then((response: AxiosResponse<User>) => {
        console.log("response:", response);
        return response.data;
    })
    .then((data: User) => {
        console.log("data:", data);
    })
    .catch((err: any) => {
        console.log(err);
    })

// code
axios<User>({
    method: "POST",
    url: baseURL + "/post_state?code=400",
    data: user,
    headers: {
        "Content-Type": "application/json"
    }
})
    .then((response: AxiosResponse<User>) => {
        console.log("response:", response);
        return response.data;
    })
    .then((data: User) => {
        console.log("data:", data);
    })
    .catch((err: any) => {
        console.log(err);
    })