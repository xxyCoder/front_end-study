const worker = new Worker("work.js");

worker.addEventListener('message', (e) => {
    console.log("message", e)
});

worker.postMessage("start")