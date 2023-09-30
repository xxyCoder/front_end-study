const xhr = new XMLHttpRequest();
// 第一个参数指定方法
// 第二个参数指定URL
// 第三个参数指定是否为异步请求
xhr.open("GET", "http://localhost:8080", true)
// 指定超时时间
xhr.timeout = 10 * 1000
xhr.ontimeout = function () {
    console.warn("time out")
}
// 监听通信状态变化
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText)
    } else {
        console.log(xhr.statusText)
    }
}
xhr.onerror = function (e) {
    console.error(xhr.statusText)
}
// 发出实际请求 如果是POST请求,需要指定请求体
const data = null;
xhr.send(data)

function upload(blobOrFile) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/server", true);
    xhr.onload = function (e) { }

    let progressBar = document.querySelector('progress');
    xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            progressBar.value = (e.loaded / e.total) * 100;
            progressBar.textContent = progressBar.value
        }
    }
    xhr.send(blobOrFile);
}