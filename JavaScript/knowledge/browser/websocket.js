import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import net from 'net';
import crypto from 'crypto';

// const app = express();
// const server = http.createServer(app);

// const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//     console.log("Connection open");
//     ws.send("Hello client!");
//     ws.on("message", function (message) {
//         console.log("recive from client:", message);
//     })
// })

// server.listen(3000);

const number = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
// 每个连接都会产生socket
const server = net.createServer(function (socket) {
    socket.once("data", function (data) {
        data = data.toString(); // 二进制形式转换
        // console.log(data)
        if (data.match(/Upgrade: websocket/)) { // 说明要升级了
            let rows = data.split('\r\n');
            // console.log(rows);
            const headers = rows.slice(1, -2).reduce((memo, row) => {
                let [key, value] = row.split(": ");
                memo[key.toLowerCase()] = value;
                return memo;
            }, {});
            const websocketKey = headers['sec-websocket-key'];
            const websocketAccept = crypto.createHash("sha1").update(websocketKey + number).digest("base64");
            // console.log(headers);
            const response = [  // 响应报文
                "HTTP/1.1 101 Switching Protocols",
                "Upgrade: websocket",
                `Sec-Websocket-Accept: ${websocketAccept}`,
                "Connection: Upgrade",
                '\r\n'
            ].join("\r\n");
            socket.write(response);

            // 继续解析
            socket.on("data", function (buffers) {
                // 接收客户端发送的消息，判断是否结束
                const FIN = (buffers[0] & 0b10000000) === 0b10000000;
                const OPCODE = (buffers[0] & 0b00001111);
                const MASK_KEY = buffers.slice(2, 6);   // 掩码长度4字节
                const PAYLOAD = buffers.slice(6);   // 数据被掩码异或过，需要还原，服务器给客户端发消息不需要掩码
                console.log(FIN, OPCODE);
                for (let i = 0; i < PAYLOAD.length; ++i) {
                    PAYLOAD[i] = PAYLOAD[i] ^ MASK_KEY[i % 4];
                }
                console.log(PAYLOAD.toString());
            });
        }
    })
});

server.listen(3000);