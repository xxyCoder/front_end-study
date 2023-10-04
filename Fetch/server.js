const http = require('http');

const server = http.createServer((req, res) => {
    console.log("cookie:", req.headers.cookie)

    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.setHeader("Set-Cookie", "name=xxyCoder;maxAge=30000;httpOnly;SameSite=None;Secure");
    res.setHeader("Access-Control-Allow-Credentials", true);

    res.end("Hello World");
})

server.listen(3000)