## http VS websocket
- http主要是客户端->服务器（单工、双工、全双工），服务器不会主动发送请求，每个请求都是独立的，http受到浏览器的同源策略影响
- websocket全双工协议，长连接

## websocket工作原理
- 请求 GET ws://localhost:3000 http/1.1
  - Connection: Upgrade
  - Sec-Websocket-Key 用于保证是合法的websocket
  - Upgrade: Websocket  表示升级的协议是什么
- 响应请求
  - Sec-Websocket-Accept 根据key算出表示握手成功
  - 状态码101 Switching Protocols
  - Upgrade: Websocket
  - Connection: Upgrade