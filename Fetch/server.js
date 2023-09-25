const http = require('http');

const server = http.createServer((req, res) => {
    console.log("hi");
    res.end("Hello World");
})

server.listen(3000)