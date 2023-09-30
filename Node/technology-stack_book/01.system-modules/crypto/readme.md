# crypto
- 加密模块是C/C++实现这些算法之后，暴露为JS接口的模块

## Cipher
- 用于加密数据，属于对称密钥加密

## 非对称加密
- 借助openssl生成公钥和私钥
- openssl genrsa -out privateKey.pem 1024
- openssl rsa -in privateKey.pem -pubout -out publicKey.pem

# 加密算法
## 对称加密算法
- DES   分组式，以64位为分组数据加密
- 3DES  三重数据加密，对每个数据块应用三次DES
- AES   区块加密

## 非对称加密
- RSA   基于数论：将两个大素数相乘，将乘积公开作为加密密钥（对乘积因式分解及其困难）
- DSA、DSS   数字签名

## 单向加密
- MD5、sha1
- 一般用于提取数据指纹、验证数据完整性、数字摘要等