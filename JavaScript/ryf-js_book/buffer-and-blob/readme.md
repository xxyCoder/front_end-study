# ArrayBuffer对象
- ArrayBuffer对象表示一段二进制数据,用来模拟内存里面的数据

# Blob对象
- 表示一个二进制文件的数据内容
- 与ArrayBuffer的区别是,Blob用于操作二进制文件,而ArrayBuffer用于操作内存
- File实例对象是一个特殊的Blob实例,增加了name和lastModifieDate
- 可以通过FileReader对象读取Blob对象的内容
  - readAsText()    返回文本
  - readAsArrayBuffer() 返回ArrayBuffer对象
  - readAsDataURL() 返回Data URL
  - readAsBinaryString()    返回原始的二进制字符串