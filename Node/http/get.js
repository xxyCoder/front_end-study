const http = require('http')

const options = {
    hostname: 'localhost',
    port: 3000,
    method: "GET",
    path: "/"
}

const req = http.request(options, res => {
    console.log(`状态码 ${res.statusCode}`)
    res.on("data", d => {
        process.stdout.write(d)
    })
    res.on("error", err => {
        console.error(err)
    })
})

req.end();