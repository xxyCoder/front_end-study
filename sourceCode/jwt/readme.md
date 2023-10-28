# 粗略实现jsonwebtoken

## sign
- 用户指定payload、algorithm、过期时间、密钥和编码方式
- 根据给定的过期时间加上当前时间，存储在payload的exp中
- 对payload和header先根据用户给定encoding编码后转变为base64编码，并借助util.form以点分割的拼接   payload.header
- 根据给定的算法和密钥，找到crypto中需要的方法去将转变后的payload和header进行加密，生成签名
- 最后使用util.form以点分割的拼接   payload.header.signature    

## verify
- 先将 payload.header.signature 拆出各个部分，将payload和header根据编码还原
- 再根据signature使用header中挂载的算法找到crypto解密，使用提供的secret解密
- 再根据payload的exp去判断有没有过期