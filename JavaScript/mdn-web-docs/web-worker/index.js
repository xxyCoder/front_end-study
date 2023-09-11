const myWorker = new Worker("work.js");
// 向worker发送消息
myWorker.postMessage(["xxyCoder", 21]);
// 终止worker
myWorker.terminate()

// 生成共享worker
const myShareWorker = new SharedWorker("work.js");
myShareWorker.postMessage(["xxyCoder", 21121]);
myShareWorker.port.onmessage = (e) => {
    
}