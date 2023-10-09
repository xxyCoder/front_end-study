# Ajax
- readyState 
  - 0 请求还未初始化
  - 1 已经建立服务器连接
  - 2 请求已接受
  - 3 正在处理请求
  - 4 请求已经完成
- response  表示服务器返回的数据体(即HTTP的body部分)
- responseText  返回从服务器接到的字符串
- responseXML 返回服务器接受到的HTML或XML文档对象
- responseURL 返回发送数据的服务器网址
- status statusText 返回服务器的状态码和状态提示
- withCredentials 表示跨域请求,cookie是否携带
- open(method,url,boolean)  调用该方法并不会实际发送请求，只是为请求做好准备
  - method:GET、POST等
  - boolean:false表示同步请求，true表示异步请求
- send([data])  接收一个参数，作为请求体发送的数据，不需要则设置为null 
- setRequestHeader()  接收两个参数，头部字段名称和值

## 请求头
- Accept  浏览器可以处理的类型
- Accept-Charset  浏览器可以显式的字符集
- Accept-Encoding 浏览器可以处理的压缩编码类型
- Accept-Language 浏览器使用的语言
- Connection  连接类型
- Host  发送请求页面所在的域
- Referer 发送请求页面的URI
- User-Agent  浏览器的用户代理字符串

## GET请求
- 向URL后面添加查询字符串，每个值和名都必须使用encodeURIComponent()编码

## XHR level 2
- overrideMimeType()  重写XHR响应的MIME类型，因为即使服务端发送了XML数据，当响应体设置的MIME类型是text/plain，就会导致responseXML属性值是null

## 进度事件
- upload  属性可以得到一个对象,通过观察读写可以得知上传进度(监听对象的loadstart、load、abort、progress等)
- loadstart 接收到响应的第一个字节触发
- progress  接收响应反复触发
  - lengthComputable  布尔值，表示进度信息是否可用
  - position  接收到的字节
  - totalSize 是响应的Content-Length头部定义的总字节数
- error 请求出现错误
- abort 调用abort()触发
- load  成功接收完触发