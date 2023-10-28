const net = require('net');
// 创建TCP服务器
const server = net.createServer(function (socket) {
    // 新的连接
    socket.on("data", function (data) {
        socket.write("Hello\r\n");
    });
    socket.on("end", function () {
        console.log("有客户端关闭连接");
    });
    socket.write("Welcome\r\n");
});
server.listen(3000);
server.on("connection", function () {
    console.log("有客户端开启连接")
})
server.on("close", function () {
    console.log("服务器关闭连接")
})
server.on("error", function (err) {
    console.log("服务器出错了", err);
})