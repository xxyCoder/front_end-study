import axios from 'axios';
// 二次封装axios
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers["Content-Type"] = "multipart/form-data"
axios.defaults.transformRequest = function (data, headers) {
    if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
        return Qs.stringfy(data);
    }
    return data;
}
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (reason) {
    return Promise.reject(reason);
})

export default axios;