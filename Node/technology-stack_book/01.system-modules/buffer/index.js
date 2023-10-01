// 创建缓冲区
const b1 = Buffer.from("10");
const b2 = Buffer.from("10", "utf8");
const b3 = Buffer.from([10]);
const b4 = Buffer.from(b3);

console.log(b1, b2, b3, b4)
// 返回一个已经初始化的Buffer，可保证新创建的永远不包含旧数据
const ba1 = Buffer.alloc(10);
console.log(ba1);
// 返回一个未初始化的Buffer，可能泄露旧数据
const bu1 = Buffer.allocUnsafe(10);
console.log(bu1)

// 字符串与buffer相互转换
const bs = Buffer.from("Hello,xxyCoder", "utf8");
console.log(bs.toString("utf8"))