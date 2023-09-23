# cookie
- 存储数据量小，一般不超过4KB
- 存储在客户端，每次发送请求都会携带cookie
- 不安全，数据可以被用户或其他网站访问到

# session
- 存储在服务器端，客户端仅仅保存一个与Session相关的标识
- 依赖cookie或URL重写
  - 服务端会将session_id存储在cookie中