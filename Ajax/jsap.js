function addURLParam(url, name, value) {
    url += url.indexOf("?") === -1 ? "?" : "&";
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

let urlg = "http://localhost:3000",
    xhrg = new XMLHttpRequest();
urlg = addURLParam(urlg, "name", "xxyCoder");
xhrg.onreadystatechange = function () {
    if (xhrg.readyState === 4) {
        if (xhrg.status >= 200 && xhrg.status < 300 || xhrg.status === 304) {
            console.log("data:", xhrg.responseText)
        } else {
            console.log("unsuccessful:", xhrg.statusText)
        }
    }
}
// 开启进度条
xhrg.onprogress = function (e) {
    if (e.lengthComputable) {
        console.log("Received " + e.position + " of " + e.totalSize + " bytes");
    }
}
xhrg.open("get", urlg, true);
// 设置超时
xhrg.timeout = 3000;
xhrg.ontimeout = function () {
    console.log("超时了");
}
// xhrg.overrideMimeType("text/xml")

xhrg.send(null)

let urlp = "http://localhost:3000",
    xhrp = new XMLHttpRequest();

xhrp.onreadystatechange = function () {
    if (xhrp.readyState === 4) {
        if (xhrg.status >= 200 && xhrg.status < 300 || xhrg.status === 304) {
            console.log("data:", xhrg.responseText)
        } else {
            console.log("unsuccessful:", xhrg.statusText)
        }
    }
}
xhrp.open("post", urlp, true);
xhrp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
let data = new FormData();
data.set("name", "xxyCoder");
xhrp.send(serialize(data));