const http = require('http');

const server = http.createServer((req, res) => {
    setTimeout(() => {
        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
        res.end("Hello XMLHttpRequest!");
    }, 2000)
})

server.listen(3000)