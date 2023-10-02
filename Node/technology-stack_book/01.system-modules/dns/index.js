const dns = require('dns')

// 使用底层操作系统工具进行域名解析，不需要经过任何网络通信
dns.lookup("nodejs.red", (err, address, family) => {
    console.log(`地址 ${address} 地址族: Ipv${family}`);
})

// 除lookup之外的所有函数，都会连接到实际DNS服务器以执行解析，并始终使用网络执行DNS查询
dns.resolve("www.nodejs.red", (err, records) => {
    console.log("resolve:", records)
})