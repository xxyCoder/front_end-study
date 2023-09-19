const http = require('http')

const options = {
    method: "POST",
    hostname: "localhost",
    port: 3000,
    path: "/"
}

const data = JSON.stringify({
    todo: "study"
})

const req = http.request(options, res => {
    console.log(`状态码 ${res.statusCode}`)
    res.on("data", d => {
        process.stdout.write(d)
    })
})

req.write(data);
req.end("end!");