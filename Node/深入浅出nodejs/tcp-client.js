const net = require('net');

const client = net.connect({ port: 3000 }, function () {
    client.write("custom");
});
client.on("data", function (data) {
    console.log("receive from server:", data.toString());
    client.end();
});
client.on("close", function () {
    console.log("client close");
})