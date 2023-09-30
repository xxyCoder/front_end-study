# File对象
- File对象代表一个文件，用来读写信息，它继承了Blob对象

# FileList对象
- 是一个类似数组的对象，代表一组选中的文件，每个成员都是File实例
- <input type="file"/> 的files属性，返回一个FileList实例
- 拖拉一组文件时，目标区的DataTransfer.files属性，返回一个FileList实例

# FileReader
- 用于读取File对象或Blob对象所包含的文件内容
- 实例属性
  - error   读取文件时产生的错误
  - readyState  表示数据的状态，0表示未加载任何数据，1表示数据正在加载，2表示加载完成
  - result  读取完成后的文件内容
- 实例方法
  - abort   用户终止的监听函数
  - error   读取错误的监听函数
  - load    读取操作完成的监听函数
  - loadend 读取操作结束的监听函数
  - onprogress  读取操作进行中
  - readAsArrayBuffer
  - readAsText  