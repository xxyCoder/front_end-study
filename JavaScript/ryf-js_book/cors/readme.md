# 跨域资源共享
- 需要浏览器和服务器都支持，目前所有浏览器都支持
- CORS分为两类：简单请求和非简单请求
  - 简单请求满足
    - 请求方法：POST、GET、HEAD中三个之一
    - HTTP的头信息：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type(限定三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)
  - 非简单请求即不满足简单请求条件的请求

## 简单请求
- 浏览器直接发出CORS请求，即在头信息中增加一个Origin字段
- 服务器接受到之后，如果Origin指定的源不在可许的范围内，服务器正常反应，这个回应的请求头不会带有Access-Control-Allow-Origin字段
- 浏览器发现没有Access-Control-Allow-Origin字段就知道出错了，从而抛出错误，这种错误无法通过状态码识别，回应的状态码可能是200

## Access-Control-
- Allow-Origin  值要么是请求时Origin，要么是*
- Allow-Credentials 布尔值，表示是否允许发送cookie
  - XMLHttpRequest还需设置withCredentials属性
  - 浏览器要发送Cookie，那么服务器就Allow-Origin字段就不能是*
- Expose-Headers    如果想拿到其他字段，需在该属性中添加字段
- Max-Age   预检请求的有效期，在有效期间，不用发出另一条预检请求

## 非简单请求
- 会在正式通信之前，增加一次HTTP查询请求，称之为“预检”请求，使用OPTIONS请求方法
- 预检的请求头信息包括两个特殊字段
  - Access-Control-Request-Method，列出浏览器CORS请求会用到哪些HTTP方法
  - Access-Control-Request-Headers，指定浏览器CORS请求会额外发送的头信息
- 浏览器会先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP方法和头信息，得到肯定答复之后，浏览器才会发出正式的XMLHttpRequest请求
- 如果服务器否定了“预检”请求，会返回一个正常的HTTP回应，但是不带任何与CORS相关的头信息或明确表示请求不符合条件
- 一旦通过预检请求，以后每次浏览器正常的CORS请求，就跟简单请求一样