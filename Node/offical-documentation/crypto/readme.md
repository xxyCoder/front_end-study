# Diffie-Hellman 密钥交换算法
- 在HTTPS握手阶段
  - 客户端：选择自然数Xa 计算出Ya = a^Xa mod p 并将Ya发送给服务端
  - 服务端：选择自然数Xb 计算出Yb = a^Xb mod p 并将Yb发送给客户端
  - 客户端：计算Ka = Yb^Xa mod p
  - 服务端：计算Kb = Ya^Xb mod p
  - 即使客户端和服务端都不知道对方的Xb和Xa，但是计算出相等的secret