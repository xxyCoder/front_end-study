# 流
- 处理数据的抽象接口，所有流都是EventEmitter实例
- Writable 可写流
- Readable 可读流
- Duplex   可读可写流
- Transform 转换流
- 都使用EventEmitter API传达当前流状态

## 流Promise API
- stream.pipeline()
  - 第一个参数是源流，即要读写的位置
  - 中间可以有多个转换流，在传输过程中进行转换
  - 倒数第二个参数是目的流，即要读写的位置
  - 最后一个参数是配置项，可省略
- stream.finished() 当流不再可读可写的时候执行
  - 第一个参数是流对象
  - 第二个参数是配置项
    - error booealn|undefined
    - readable  booealn|undefined
    - writable  booealn|undefined
    - signal    booealn|undefined

## 缓存
- Writable和Readable流都将数据暂存到内部缓冲区中，缓存数据量取决于传给构造函数的highWaterMark选项（指定字节数）
  - 选项是一个阈值，而不是限制： 它规定了流在停止请求更多数据之前缓冲的数据量。 它通常不强制执行严格的内存限制
  - 当到达阙值，write写入数据返回false

## 可写流
- 示例：
  - 客户端的HTTP请求、服务器的HTTP响应
  - 文件系统写入流
  - 子进程标准输入流
- 事件
  - close
  - drain，当write(chunk)返回false则触发
  - error
  - finish，当调用end()方法之后并且所有数据都已刷新到底层系统触发
  - pipe，调用pipe()方法触发，传给其回调函数流对象
- 方法
  - cork()  强制所有写入的数据都缓存在内存中
    - 调用uncork()或end()方法时候缓存数据被刷新
  - destroy()   销毁流
  - end()   允许在关闭之前写入最后一个额外的数据块
  - setDefaultEncoding(encoding)    设置默认编码
  - write(chunk[,encoding[,callback]])
- 属性
  - writableLength 准备写入的字节数量