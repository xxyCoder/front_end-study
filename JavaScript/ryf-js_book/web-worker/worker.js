addEventListener("message", function (e) {
    this.postMessage("you said:" + e.data)
    if (e.data === "done") {
        this.close()
    }
}, false)

// 加载脚本
importScripts("http://localhost:8080/a.js", "http://localhost:8080/b.js")


