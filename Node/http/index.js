const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.headers)
    let requestText = "";
    req.on("data", d => {
        requestText += d;
    })
    req.on("end", () => {
        console.log(requestText)
    })
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World")
})

server.listen(3000, () => {
    console.log("running")
})