// 创建worker线程
const w = new Worker("worker.js", { name: "myWorker" });
// 向worker发送消息
w.postMessage("Hello World");
w.postMessage({ method: "echo", args: ["work"] })
// 监听worker发送消息
w.onmessage = function (e) {
    console.log("接收消息:", e.data);
    w.postMessage("done!")
    // 结束worker
    w.terminate();
}
// 监听错误处理
w.onerror = function (e) {
    console.log(`line ${e.lineno} in ${e.filename}: ${e.message}`);
}