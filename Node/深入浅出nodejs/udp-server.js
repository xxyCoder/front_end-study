const dgram = require('dgram');

const socket = dgram.createSocket("udp4");
socket.on("message", function (message, rinfo) {
    console.log("服务器获得:" + message + " from " + rinfo.address + ":" + rinfo.port);
})
socket.on("listening", function () {
    const address = socket.address();
    console.log("服务器监听 " + address.address + ":" + address.port);
});
socket.bind(4000);