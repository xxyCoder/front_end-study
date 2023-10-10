# Fetch https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
- 功能与XMLHttpRequest基本相同，但有三个主要的差异
  - fetch使用Promise，不使用回调函数，必须是异步，XHR可选是否异步
  - 采用模块化设计，API分散在多个对象上（Response、Request、Headers）
  - 通过数据流处理数据
- fetch成功后，得到一个Response对象
- 只有网络错误或无法连接，fetch才会报错，也就是说即使服务器返回的状态是4xx或5xx，Promise也不会是reject状态

## Response
- status  状态码
- statuxText  状态信息
- redirected  是否重定向了
- ok  状态码200~299之间为true

## 读取内容方法
- response.text()   得到文本字符串
- response.json()   得到JSON对象
- response.blob()   得到二进制blob对象
- response.formData()   得到FormData对象
- response.arrayBuffer()    得到二进制ArrayBuffer对象
- 方法都是异步获取，且流对象只能读取一次

## body
- response.body返回一个一个ReadableStream对象，可以用来分块读取内容，显示下载的进度

## cache
- default 默认值，先从缓存中找
- no-store  直接发送请求
- reload  直接请求服务器，并更新缓存
- no-cache  类似协商缓存
- force-cache 缓存优先，只有不存在缓存才会请求远程
- only-if-cache 只检查缓存，如果缓存不存在，返回504错误

## mode
- cors  默认值，允许跨域请求
- same-origin 只允许同源请求
- no-cors 只限于GET、POST、HEAD，并添加部分请求头

## credentials
- same-origin 默认值，同源请求发送cookie
- include 不论同源还是跨域都发送cookie
- omit  都不发送

## signal
- 支持通过AbortController中断fetch请求

# Header对象
- 所有外发请求和入站响应体部的容器
- 与Map有相似之处，相同的方法，但是初始化可使用对象初始化

# Request对象
- 获取资源的请求接口
- 接收一个URL作为参数，第二个参数是init对象

# Response对象
- 获取资源响应的接口
- 初始化不需要URL参数，有可选body参数，init参数