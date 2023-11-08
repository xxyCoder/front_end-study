# Blob类
- new buffer.Blob([source[,options]])
  - source 是将要存储在blob中的字符串数组
  - options 提供配置项
    - endings 如何换行
    - type blob的类型
- arrayBuffer   返回promise包裹的blob数据副本
- size  blob总大小
- slice([start[,end[,type]]])
  - type 切割之后新的数据类型
- stream()  返回ReadableStream
- text()    返回promise包裹的text文本

# Buffer类
- alloc(size[,fill[,encoding]])
- compare(bf1,bf2) 对buffer实例的数组进行排序
- concat(list[,totalLength])
  - totalLength 表示组合长度如果超出则截断
- copyBytesFrom(view[,offset[,length]])
  - view 需要复制的TypeArray
- from(data)
- isBuffer(obj)
- isEncoding(encoding)