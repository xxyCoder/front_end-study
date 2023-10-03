const xhr = new XMLHttpRequest();
// 第一个参数指定方法
// 第二个参数指定URL
// 第三个参数指定是否为异步请求
xhr.open("GET", "http://localhost:3000", true)
// 指定超时时间
xhr.timeout = 3 * 1000
xhr.ontimeout = function () {
    console.warn("time out")
}
// 监听通信状态变化
xhr.onreadystatechange = function () {
    console.log("current state:", xhr.readyState);
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
xhr.onload = function (e) {
    console.log("load", e)
}
// 终止
setTimeout(() => {
    xhr.abort();
}, 5000)
xhr.onabort = function () {
    console.log("手动终止")
}

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