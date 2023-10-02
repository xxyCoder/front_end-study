# 域名解析系统
- 将域名解析为IP地址进行工作

## lookup和resolve区别
- 尽管使用异步的JS调用lookup，但在内部libuv底层线程池中却是同步调用getaddrinfo(3)，所以有一些不确定因素造成node进程阻塞
- resolve没有使用getaddrinfo(3)，而是通过网络执行的DNS查询，始终保持异步不会对其他进程产生负面影响