# WebSocket
- WebSocket(url\[,protocols])
- 实现长时连接实现与服务器全双工、双向的通信
- 允许服务器主动发送信息
- 支持跨域，不受同源限制
- 通信过程：
  1. 客户端发送WebSocket握手请求，请求头中包含Upgrade: websocket和Connection: Upgrade等字段，告知服务器希望升级到WebSocket协议。
  2. 服务器返回WebSocket握手响应，响应头中包含Upgrade: websocket和Connection: Upgrade等字段，告知客户端已接受WebSocket协议。
- 这意味着WebSocket不能通过标准HTTP服务器实现，必须使用支持该协议的专有服务器
- URL以ws://或wss://开头
- readystate属性表示当前状态，但是没有onreadystate事件
  - 0 连接正建立
  - 1 连接已经建立
  - 2 连接正在关闭
  - 3 连接已经关闭
- 方法
  - close(\[code\[,reason]])    关闭当前连接
  - send(data)  发送数据
- 事件
  - close
  - error
  - message 收到数据时触发
  - open    连接成功触发