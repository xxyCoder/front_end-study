onmessage = (msg) => {
    const workerResult = `Result: ${msg.data[0]} - ${msg.data[1]}`
    console.log(workerResult)
}

onconnect = (e) => {
    const port = e.ports[0];
    port.onmessage = (e) => {
        const workerResult = `Result: ${e.data[0] * e.data[1]}`;
        port.postMessage(workerResult);
    }
}