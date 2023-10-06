# 同源策略
- 同源是指协议、域名、端口相同
- 但浏览器没有遵守端口必须相同的规定，故协议和域名相同，但是端口不同是可以互相读取cookie的
- 设置同源的目的是为了保证用户信息的安全，防止恶意的网站窃取数据
- 如果非同源，那么有三种限制
  - 无法读取非同源网页的Cookie、localStorage和IndexedDB
  - 无法接触非同源网页的DOM
  - 无法向非同源地址发送AJAX请求（可以发送，但是浏览器会拒绝响应）
- 浏览器通过检查document.domain判断是否同源，可以更改domain使得cookie在同源不同路径下共享，但是对于localStorage和indexDB没有作用

## iframe和多窗口通信
- 只有同源情况下，子窗口和父窗口才能通信

## 片段识别符
- 指的是URL的#号后面部分，如果只是改变片段识别符，页面不会重新刷新
- 父窗口可以把信息写入子窗口的片段识别符，子窗口通过监听hashchange事件得到通知
  - src = originURL + "#" + data
- 同样的，子窗口也可以改变父窗口的片段识别符
  - parent.location.href = target + "#" + hash

## 跨文档通信API
- 该API为window对象新增方法postMessage()，允许跨窗口通信，不论两个窗口是否同源

## AJAX跨域
- JSONP 请求的网址带有callback参数用于告诉服务器客户端的回调函数名，只允许发送get请求
- WebScoket 是一种通信协议，使用ws://（非加密）和wss://（加密），其请求头信息带有origin，服务器可以根据其是否在白名单内判断是否允许通信
- Cors  跨域资源分享