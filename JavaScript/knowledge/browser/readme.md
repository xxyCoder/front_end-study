# 浏览器环境

## 加载脚本
- 除了script引入脚本，还可以通过url(javascript:)协议，即在url的位置写入代码，如果写入的是字符，浏览器会创建新文档展示该字符且丢失原文档内容

## script
- 浏览器一边下载html网页一边开始解析，解析过程中发现script元素就暂停解析，将网页控制权给js引擎，如果该脚本引入外部脚本就需要先下载（也会阻塞html解析）后解析，当js引擎执行完毕将控制权交还给渲染引擎，继续解析html
  - 多个script元素会并行下载，但是会按照书写顺序执行，并行下载有一定数量限制，为了避免过度竞争、防止网络阻塞、减轻服务器压力
  - script没有同源限制，有时候需要其加载第三方脚本，但是可以通过CSP限定加载脚本的来源；也可以给script脚本指定integryty指定脚本的hash内容防止篡改
  - script到defer属性可以延迟脚本执行到dom加载生成后，下载的时候不会阻塞html解析
  - async属性则是下载时不会阻塞渲染，但是无法保证script的执行顺序
  - 动态生成的script然后插入页面，好处是不会阻塞页面渲染，但是无法保证执行顺序（可以设置async=false去避免该问题且不会阻塞html渲染）
- script元素放底部的好处是不会阻塞页面渲染html，且可以在dom结构生成之后调用dom节点不会导致报错（也可以使用DOMContentLoaded事件的回调函数）

## 浏览器组成
- 渲染引擎和js引擎
  - 渲染引擎负责解析html代码为dom，css代码为cssom，合成渲染树，布局和绘制，以上并非严格按顺序执行
  - 现代js引擎处理代码采用“即时编译”，即字节码（先读取代码进行词法分析->进行语法分析->将代码转换为字节码->字节码转换为机器码，字节码不能是不能直接执行的，运行在一个虚拟机上，虚拟机也称之为js引擎）只在运行时编译，用到哪一行编译哪一行，并将编译结果缓存

## window
- 指当前浏览器窗口，也是页面的顶层对象
- 属性
  - opener表示打开当前窗口的父窗口，如果从地址栏输入打开则为null，拿到opener有同源限制，也可以对a标签添加属性rel="noopener"防止新窗口拿到父窗口
  - frames是window的别名，其成员是页面内所有框架窗口，如果iframe设置了id或name，则可以通过id或name引用，iframe的window通过iframe的contentWindow拿到
  - top指向最顶层窗口,parent指向父窗口
  - devicePixelRatio表示一个css像素由多少个物理像素组成
  - innerHeight/innerWidth返回当前窗口可见部分的高度和宽度
  - scrollX/scrollY返回水平和垂直滚动距离
  - isSecureContext表示是否是https协议
- 方法
  - open()打开新窗口
  - close()关闭当前窗口
  - stop()停止加载图片、视频等或在等待加载的对象
  - scrollTo()将文档滚动到指定位置
  - print()跳出打印框
  - getSelection()返回一个Selection对象，表示用户现在选中的文本
  - getComputedStyle()接受一个元素作为参数，返回其样式表最终信息
  - requestAnimationFrame()将执行函数推迟到下一次重流时执行
    - 将requestAnimationFrame返回值给cancleAnimationFram()来取消回调函数执行
  - requestIdleCallback()将函数推迟到系统资源空闲时执行，或者给定属性超过时间限制执行
    - 将requestIdleCallback返回值给cancelIdleCallback()取消回调函数

## navigator
- 包含浏览器和系统信息的对象
- 属性
  - userAgent表示用户的设备信息以及浏览器的厂商等信息
  - geolocation包含用户地理位置的信息，只有在https协议下可用，否则调用以下方法报错
    - Geolocation.getCurrentPosition()得到用户当前位置
    - Geolocation.watchPosition(fns)监听用户位置变化
    - Geolocation.clearWatch()取消监听
  - cookieEnabled表示浏览器的cookie功能是否打开
- 方法
  - sendBeancon()该方法为了解决页面在卸载时用ajax或fetch请求可能被取消问题
    - 异步请求，请求与当前页面的线程脱钩，是作为浏览器进程的任务
    - 不允许自定义http标头，优先级低，不会占用页面资源

## history
- 表示当前窗口的浏览历史，保存了当前窗口访问过所有的网页地址，由于安全原因不允许读写，但可以导航
- 属性
  - length表示当前窗口访问过的网址数量
  - state堆栈最上层状态值
- 方法
  - back()回退
  - forward()前进
  - go(number) => go(0)表示刷新
  - pushState(state, title, url) url必须和当前网页在同一个域，设置跨域则报错
  - replaceState(state, title, url)，同上，但是是替换
  - popstate事件，当history对象出现变化触发，对于pushState和replaceState不会触发，对于加载不同文档也不会触发

## location
- window.location或document.location都可以拿到
- 属性
  - href整个url，指定url则跳转新地址，指定片段字符串则滚动到锚点
  - pathname 路径，从根路径/开始
  - search 查询字符串，从问号?开始
  - hash 片段字符串，从#开始
  - origin url当协议、主机和端口 只读
- 方法
  - assign(url)
  - replace(url)
  - reload()重新加载当前网址

## URL
- 元字符：/ ? : @ & = + #
- 语义字符：a-zA-Z - _ . * '
- 其他字符都需要转义
- 方法
  - encodeURI()转码整个url，将除了元字符和语义字符之外的字符都进行转义
  - encodeURIComponent()转码url的组成部分（如果转码整个，由于也会转码元字符，导致url不合法报错），转码除了语义字符之外的
  - decodeURI()解码
  - decodeURIComponent()解码
- 构造函数
- 静态方法
  - createObjectURL()在内存中生成一个url字符串，指向file或blob文件
  - revokeObjectURL()释放内存中的url字符串
- 属性，与Location对象基本一致

## URLSearchParams
- 用来构造、解析和处理url的查询字符串，对查询字符串会自动编码，也可以作为表单实例发送
- 可以使用for...of遍历
- 方法
  - append(key,value)追加参数，不会判断key是否存在
  - delete(key)删除指定key
  - has(key)判断是否存在
  - set(key,value)添加参数，key存在则覆盖，不存在则添加
  - get(key)拿到value
  - getAll(key)拿到全部key的value
  - sort()

## Blob
- 表示一个二进制文件的数据内容，通常用于读写文件
- 属性
  - size数据大小
  - type数据类型
- 方法
  - slice

## File
- 代表一个文件，继承了Blob对象
- 属性
  - lastModified最后修改时间
  - name文件名或路径
  - size大小，单位字节
  - type文件类型

## FileReader
- 属性
  - error读取错误产生的错误对象
  - readyState当前读取文件状态，2表示加载完成
  - result读取后的结果
- 方法
  - onabort()
  - onerror()
  - onload()
  - onloadstart()
  - onloadend()
  - onprogress()
  - abort()
  - readAsXXX(file)（可以是ArrayBuffer、DataURL、Text）
    - 对于base64这个字符串不能直接进行 Base64 解码，必须把前缀data:*/*;base64,从字符串里删除以后，再进行解码。

## FormData
- 代表表单对象
- 方法
  - get(key)
  - getAll(key)
  - set(key, value)
  - delete(key)
  - append(key, value)
  - has(key)
- 自动校验
  - 控件通过校验触发 :valid伪类，否则触发 :invalid伪类
  - checkValidity()手动触发校验
  - willValidate属性表示控件提交时是否进行校验
  - validationMessage属性返回一个字符串表示不满足校验条件时，浏览器显示的文本，只读
  - setCustomValidity(message)替换浏览器内置校验不通过报错信息
  - validity属性返回一个validityState对象，包含当前校验状态信息
  - 表单的novalidate属性用于关闭浏览器的自动校验
  - 可以监听控件的invalid属性

## cookie
- 是服务器保存在浏览器的一段文本信息，一般大小不超过4kb（超过则忽略），只有哪些需要让服务器知道的信息才应该放在cookie里面
- 想要改变原本cookie，需要满足key、domain、path、secure都匹配
- 属性
  - expires指定一个具体的到期时间
  - max-age指定存储的时间秒数
  - domain指定属于那个域，只能设置为当前域名或上级域名，为上级域名不能说顶级域名或公共域名
  - path指定浏览器发送http请求哪些路径需要携带该cookie
  - secure指定只有https下才能发送
  - httpOnly指定无法通过js脚本拿到
  - sameSite
    - strict完全禁止第三方cookie
    - lax禁止第三方cookie除非get（a标签、预加载、get表单）请求
    - none关闭该属性

## XMLHttpRequest
- 用于浏览器和服务器之间的通信
- 属性
  - readyState表示当前状态，0表示实例已经生成，1表示open方法调用，2表示send调用，3表示数据正在接收，4表示全部接收完成
  - responseType表示返回的数据类型
  - response即http的body部分，可能是任意类型，由responseType决定
  - responseText
  - responseXML
  - responseURL表示发送数据的服务器网址
  - status和statusText表示状态码和信息
  - timeout多少毫秒后没有得到结果就自动终止，0则表示没有时间限制
  - withCredentials表示跨域请求是否携带cookie
  - upload可以拿到一个对象，得知文件上传的进展，有着和xhr一样的监听函数
- 方法
  - onreadystatechange监听readystate的变化
  - ontimeout监听函数，超时触发
  - onabort监听终止函数
  - onerror监听错误函数
  - onload监听请求成功函数
  - onloadend监听请求完成函数（无论成功或失败）
  - onprogress监听正在发送和加载的数据函数
  - onloadstart监听http发出请求的函数
  - open()指定http请求参数
  - send()发出请求，给参数就是body
  - abort()终止请求 => readystate=4,status=0
  - setRequestHeader()设置请求头
  - getResponseHeader()拿到响应头

## fetch https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
- fetch(url, options)
- 与xhr有三个差异：
  1. fetch使用promise，而xhr使用回调函数
  2. fetch使用模块化设计，api分散在多个对象上(Response、Request、Header对象)，而xhr的输入输出都在同一个接口中
  3. fetch通过数据流对象，可以分块读取，而xhr不支持数据流，只能等数据全部拿到后一次性吐出来
- 只有网络错误或无法连接才会报错，其余都认为是请求成功（即时服务器返回4xx或5xx状态码）
- 属性
  - response.status和response.statusText是同步属性
  - response.ok表示请求是否成功（即response.statu是200到299之间）
  - response.url请求的url
  - response.type请求类型
  - response.redirected表示是否发生过跳转
  - response.headers对应http回应所有标头
    - get(key)
    - has(key)
    - for...
  - body返回一个ReadableStream对象，可以分块读取内容
- 异步方法，且只能调用一次，多次调用则报错，可以使用response.clone()克隆多次然后调用以下方法
  - response.text()拿到文本
  - response.json()拿到json对象
  - response.blob()拿到二进制对象
  - response.formData()拿到表单对象
  - response.arrayBuffer()拿到二进制arrayBuffer对象

## 同源限制
- 同源是指协议、域名、端口都相同，但是对于不同端口是可以互相读取cookie的
- 对于非同源页面，只允许接触网页window对象的九个属性和四个方法
  - window.closed
  - window.frames
  - window.location，只允许调用location.replace()和window.href属性
  - window.opener
  - window.parent
  - window.top
  - window.close()
  - window.postMessage()
  - ...

### 规避限制
- 对于cookie和iframe可以将其设置为最近且相同的域名，比如a: wwww.a.example.com,b: www.b.example.com，则将document.domain设置为example.com，设置了domain会将端口重置为null，因此两个网页都需要设置否则导致两个端口不一样从而还是不同源
- 对于iframe还可以使用片段识别符（#后面内容），父窗口可以把信息写入子窗口的片段标识符，子窗口通过监听hashchange得知
- h5新增postMessage允许跨窗口通信了，使得读写其他窗口的localStorage成为可能

## cors通信
- cors需要服务器和浏览器同时支持，整个过程都是浏览器自动完成，浏览器发现跨域请求会自动添加附加的头信息，有时还会多出一次的附加的请求

### 简单请求
- 请求方法：HEAD、GET、POST
- 请求头：Accept、Accept-Language、Content-Language、Content-Type（application/x-www-form-urlencoded、multipart/form-data、text/plain）、Last-Event-ID
- 对于简单请求浏览器直接发出cors请求，并在头信息中添加origin字段，对于指定的origin不在服务器的许可范围，则服务器返回一个正常的http响应，浏览器收到后发现没有该字段（Access-Control-Allow-Origin）或Origin与字段不匹配则报错
- Access-Control-
  - Allow-Origin可以接受的域名
  - Allow-Credentials是否允许发送cookie
  - Expose-Headers对于Cors请求只能拿到六个响应头信息，指定该字段可以拿到额外的

### 非简单请求
- 会在正式通信之前增加一次http查询请求，称之为“预检”。浏览器会先询问服务器当前页面域名是否在白名单内切哪些http方法和请求头信息可以用，给服务器一个提前拒绝的机会，避免收到大量delete和put请求
- Access-Control-
  - Request-Method允许的方法
  - Request-Header允许的头信息
```预检头信息
OPTIONS /cors HTTP/1.1
Origin: http://api.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
```

```预检请求的回应
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://api.com
Access-Control-Allow-Methods: GET,POST,PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Max-Age: 60000
```
- Access-Control-Max-Age表示本次预检的有效期，单位为秒，在有效期内对于复杂请求不需要再次发生预检

## storage
- sessionStorage用于保存浏览器的一次会话，localStorage长期保存
- 数据以键值对形式存在，数据以文本格式保存，存储量由浏览器而定
- storage接口存储的数据发生变化会触发storage事件
  - storageEvent.key 表示发生变动的键名，如果是clear()触发则为null
  - storageEvent.newValue 表示新的值，如果是clear()触发则为null
  - storageEvent.oldValue 表示旧的值，如果是新增触发则为null
  - storageEvent.storageArea 返回键值对所在的整个对象
  - storageEvent.url表示触发该事件的网页url
- 超出容量限制会出现异常导致程序崩溃，在进行存储的时候使用try...catch捕获

### 与cookie的区别
- webStorage是完全存储在浏览器中，而cookie会跟随每次http请求发送到服务器
- webStorage的存储量约为5mb（与浏览器实现相关），而cookie只有2kb
- webStorage不能设置过期时间（除非把时间也携带中存储对象中），而cookie可以设置
- 操作webStorage有丰富api，而cookie需要自己封装方法
- webStorage仅可以中当域中使用，而cookie需要自己设置作用域

## indexedDB
- cookie大小一般不超4kb且每次请求都会发送回服务器；webStorage不支持搜索功能，不能建立自定义索引；webSQL浏览器支持度过低
- indexedDB是一种在浏览器中使用的纯客户端本地数据库，允许开发人员存储和检索复杂的数据类型（不仅仅是字符串）
- 使用异步api来管理数据库，即执行数据库的时候不会阻塞主线程；支持事务；有同源限制；大容量存储（一般不少于250mb）

### IndexedDB对象
- IndexedDB是全局对象
- IDBDatabase数据库对象（IndexedDB.open()返回），代表一个数据库
- IDBObjectStore对象仓库，类似关系型数据库中表格
- IDBIndex索引
- IDBTransaction事务
- IDBRequest操作对象，代表一个异步请求
- IDBCursor指针，代表了一个游标

## Web Worker
- 一种在浏览器后台线程中运行js的机制，允许长时间允许的js脚本放在后台线程中，从而不会阻塞ui线程
- 可以和主线程进行通信，但是无法访问dom和主线程数据，可以使用navigator和location对象
- 有同源限制，分配给worker线程运行的脚本必须与主线脚本同源
- 有自己的内存空间，在worker中创建大量数组或对象需释放，避免内存泄漏
- 可以使用XMLHttpRequest发出ajax请求

## Share Workers
- 可以被多个页面所共享的线程，可以在多个页面之间传递信息

```html
<!-- page1 -->
<script>
  const worker = new SharedWorker("worker.js");
  const port = worker.port;
  port.onmessage = function(e) {
  	console.log(e.data);
  }
  port.start();
  port.postMessage("hello");
</script>
<!-- page2 同上-->
```

```js
const connections = [];
// 当一个页面连接到share worker到时候，触发connect事件
self.onconnect = function(e) {
  const port = e.ports[0];
  connections.push(port);
  port.onmessage = function(e) {
    connections.forEach(p => p.postMessage(e.data));
  }
}
```

## 服务器推送事件sse
- Server-Sent Event，此事件允许网页自动从服务器获取更新，以往所客户端主动发起请求询问，现在通过sse服务进行数据更新的内容可以自动到达客户端
- 使用单个长连接保持数据流
- 服务器需要支持sse所依赖的text/event-stream协议

### 核心概念以及api用法
- 其内部核心是EventSource对象，用于创建服务器发送事件流的连接
  - 单向通信：只能从服务器接受数据，不能向服务器发送数据
  - 自动重连：如果断开连接，会自动尝试重新连接服务器，直到连接成功或到达最大重连次数
  - 事件处理：可以监听来自服务器的事件，并在事件触发的时候触发对应事件处理程序

```js
// 连接服务器端点
const eventSource = new EventSource("/backend-path");
// 成功连接触发open事件
eventSource.onopen = function(e) {}
// 收到来自服务器发送的数据
eventSource.onmessage = function(e) {}
// 连接发生错误
eventSource.onerror = function(e) {}
```

- 服务器后端需要注意，发送的消息必须以 data:开头，后面跟着消息，并以两个换行符结尾
- 如果服务器和客户端域名不同，会存在跨域问题
- 发送的数据可能被缓存，需要添加cache-control: no-cache

## webSockets
- 建立在单个tcp连接上进行全双工通讯的协议，允许浏览器和服务器之间建立一个持久、双向的通信通道

### websocket工作原理
- 请求 GET ws://localhost:3000 http/1.1
  - Connection: Upgrade
  - Sec-Websocket-Key 用于保证是合法的websocket
  - Upgrade: Websocket  表示升级的协议是什么
- 响应请求
  - Sec-Websocket-Accept 根据key算出表示握手成功
  - 状态码101 Switching Protocols
  - Upgrade: Websocket
  - Connection: Upgrade

### api基础用法

```js
// 第一个是webSocket服务器地址，可以是相对也可以是绝对
const Socket = new WebSocket(url, [protocols]);
```

- 创建后，可访问属性
  - readyState：0(Connecting)、1(Open)、2(Closing)、3(Closed)
  - bufferedAmount：表示还有多少字节数据没有发送出去
  - extensions：表示服务器的扩展协议
  - protocol：表示服务器选择的子协议
- 事件
  - onopen：连接建立时触发
  - onmessage：客户端接受服务器端数据触发
  - onerror
  - onclose
- 方法
  - send()
  - close()