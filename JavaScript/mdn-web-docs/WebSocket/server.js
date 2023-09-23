const ws = require('nodejs-websocket');

const server = ws.createServer((conn) => {
    conn.on("text", d => {
        console.log("message from websocket", d);
    })
    conn.on("close", (code, reason) => {
        console.log(`close ${code} ${reason}`)
    })
    conn.sendText("Hello!")
})

server.listen(3000);