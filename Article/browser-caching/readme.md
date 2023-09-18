# 浏览器缓存
- 指浏览器访问网页时将一些数据存储在客户端本地(C:/user/AppData)，这样用户下次访问就可以从缓存中加载数据
- 提升性能和加快加载速度
- 减少网络流量和节省带宽
- 支持离线访问

# 强缓存与协商缓存
- 强缓存(Cache-Control和Expires)，优先级高于协商缓存
  - Cache-Contorl
    - max-age 指定资源在缓存中有效时间
    - no-cache 表示每次请求都要与服务器端验证，不能直接使用缓存
    - no-store 表示不缓存任何请求或响应内容
    - public 表示响应可以被任何（包括客户端和中间代理服务器）缓存
    - private 表示响应只能被客户端缓存
  - Expires 指定了资源的过期时间，并在过期时间之前直接使用缓存
  - Cache-Control优先级高于Expires
- 协商缓存(Last-Modified和ETag)，通过比较资源的标识符来确定是否使用缓存
  - Last-Modified和If-Modified-Since 服务器在响应头返回资源最后修改的时间，浏览器在后续请求的时候携带If-Modified-Since:Last-Modified给服务器端
  - ETag和If-None-Match 服务器在响应头返回资源的唯一标识符，浏览器在后续请求通过携带If-None-Match:ETag给服务器端与资源的ETag进行匹配
  - 如果都没有发生改变，服务器端返回304 Not Modified
