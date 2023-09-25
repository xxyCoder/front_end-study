# Fetch https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
- 功能与XMLHttpRequest基本相同，但有三个主要的差异
  - fetch使用Promise，不使用回调函数
  - 通过数据流处理数据
- fetch成功后，得到一个Response对象
- 只有网络错误或无法连接，fetch才会报错，也就是说即使服务器返回的状态是4xx或5xx，Promise也不会是reject状态

## 读取内容方法
- response.text()   得到文本字符串
- response.json()   得到JSON对象
- response.blob()   得到二进制blob对象
- response.formData()   得到FormData对象
- response.arrayBuffer()    得到二进制ArrayBuffer对象
- 方法都是异步获取，且流对象只能读取一次

## body
- response.body返回一个一个ReadableStream对象，可以用来分块读取内容，显示下载的进度