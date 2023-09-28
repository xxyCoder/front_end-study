# URL的编码和解码
- 元字符：分号、逗号、斜杠、问号、冒号、@、&、=、+、$、#
- 语义字符：a-z、A-Z、0-9、-、_、. 、！、~、*、'、()
- encodeURI()   转码整个URL，会将元字符和语义字符之外的字符都进行转义
- decodeURI()   是encodeURI的逆运算
- encodeURIComponent()  转码URL的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码
- decodeURIComponent()  是encodeURIComponent的逆运算

# URL接口
- 实例属性
  - href    返回整个URL
  - protocol    返回协议，以冒号结尾
  - hostname    返回域名
  - host    返回域名与端口，默认的80和443会省略
  - port    返回端口
  - origin  返回协议、端口、域名，唯一属性只读
  - pathname    返回路径，以斜杠/开头
  - search  返回查询字符串，以问号开头
  - searchParams    返回一个URLSearchParams实例，该属性是Location对象没有的
  - hash    返回片段识别符，以#开头
  - password    返回域名前的密码
  - username    返回域名前的用户名
- 静态方法
  - createObjectURL()   用来上传/下载文件、流媒体文件生成一个URL字符串，这个字符串代表了File对象或Blob对象的URL
  - revokeObjectURL()   由于createObjecetURL会在内存中生成URL实例，如果不再需要该URL字符串，可以使用revokeObjectURL方法释放