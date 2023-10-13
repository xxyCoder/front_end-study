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
axios({
    method: "GET",
    url: baseURL + "/get",
    params: user
})
    .then((response: AxiosResponse) => {
        console.log(response);
        return response.data;
    })
    .catch((err: any) => {
        console.log(err);
    })