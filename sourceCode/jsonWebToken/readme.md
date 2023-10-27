# JWT源码
- jwt是个对象，包含了verify、sign、decode等方法

## sign
- 第一个参数payload
- 第二个参数密钥或者密文
  - 调用crypto.createSecretKey(key)创建并返回包含私钥的新密钥对象
- 第三个参数是选项
  - algorithm默认是HS256
  - maxAge最长允许token生存的时间
- 第四个参数是回调函数
- 最后调用了jws.sign

## jws.sign
- 将payload先转码成自己给的encoding或"UTF-8"，然后转换为base64
- 用提供的算法和密钥进行加密payload