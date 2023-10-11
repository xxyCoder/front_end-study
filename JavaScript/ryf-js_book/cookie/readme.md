# cookie
- 保存登录状态、购物车等需要记录的信息
- 个性化信息：保存用户的偏好，比如网页字体大小、背景色
- 追踪用户，记录和分析用户行为
- 按照域名划分，只能读取自己域名，各级子域名和本域名都可以读取本域名cookie
- 一般来说，单个域名设置的cookie不应该超过30个，每个cookie大小不能超过4kb，超出限制将被忽略
- navigator.cookieEnabled 返回一个布尔值，表示浏览器是否打开cookie功能

## cookie元数据
- name  名字
- value 值
- Expires   到期时间，不设置该属性或为null，Cookie只在当前会话有效
- Max-Age   指定从现在开始Cookie存在的秒数，如果同时设置了Max-Age和Expires，那么Max-Age优先生效
- Domain    所属域名，通过该属性判断发送请求是否携带，没有指定域名，则默认是浏览器当前域名，如果域名是ip地址，则不得设置该属性；如果指定域名，那么只能设置为当前域名或当前域名的上级域名，但设置为上级域名不能是顶级域名或公共域名
- Path  生效路径，判断哪些路径需要携带cookie
- Secure    指定浏览器只有在加密协议HTTPS下，才能将该cookie发送到服务器，该属性只是开关，不需要指定值
- HttpOnly  指定Cookie无法通过JS脚本（document.cookie、XMLHttpRequest对象和Request API）拿到
- SameSite  用来防止CSRF攻击和用户追踪
  - Strict  完全禁止第三方Cookie
  - Lax 大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求（链接，预加载请求，GET 表单）除外
  - None    关闭该属性，前提是必须同时设置Secure属性

## cookie的生成
- HTTP回应 Set-Cookie: key=value;
- 如果想要改变之前设置过的cookie，就必须保证其cookie的key、domain、path、secure是与要改变的cookie相同
- HTTP请求 Cookie: key=value，服务器收到浏览器发送的cookie，是无法知道cookie何时过期，也不知道属于那个域名（一级还是二级）

## 子cookie
- 目的是绕过浏览器对每个域的cookie数限制，格式类似于查询字符串
  - name1=valu1&name2=value2