const dgram = require('dgram');

const message = "xxyCoder";
const client = dgram.createSocket("udp4");
client.send(message, 4000, "127.0.0.1", function (err, bytes) {
    console.log(err, bytes);
    client.close();
})