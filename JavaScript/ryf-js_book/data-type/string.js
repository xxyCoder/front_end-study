// 字符串默认一行
const sigleStr = "Hello World";
// 多行需要在每一行尾部使用反斜杠
const multiStr = "Hello \
World"
console.log(multiStr)
// + 拼接多个单行字符串
const longStr = sigleStr + " " + multiStr
// 字符串与数组
console.log(longStr[0], longStr[1])
// 不能修改字符串之中某个字符，也不能删除，即使操作了也会失败
delete longStr[0];
longStr[1] = 'X';
console.log(longStr);
// Base64转码，其Base64就是一种编码方式，其目的是为了不出现特殊字符，简化程序的处理
// 这两方法不适应于非ascii码字符
// 把不可打印字符都转换为可打印字符，这样数据可以通过文本的形式携载而不是以二进制的形式。
console.log(btoa(longStr));
console.log(atob(btoa(longStr)))
// 字符的Unicode表示    \uxxxx  其中 xxxx是字符的Unicode码点
console.log("\u0061")
// 如果\u后面超过0xFFFF的数值，如\u20BB7 就会理解成 \u20BB + 7
console.log("\u20BB7")
// 将码点加入大括号可解决该问题
console.log("\u{20BB7}")
// 大括号表示法和四字节UFT-16编码等价
console.log('\u{1F680}' === '\uD83D\uDE80')
// 字符串遍历器接口，相比传统for循环，最大优点是可以识别大于0xffff的码点
const text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; ++i) {
    console.log(text[i]);
}
console.log('-------分割线-------');
for (let s of text) {
    console.log(s)
}