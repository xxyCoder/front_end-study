// 创建方法一
const regex1 = /xyz/igm;
// 创建方法二
const regex2 = new RegExp('xyz', 'igm')
// prototype上属性
console.log(regex1.global, regex1.ignoreCase, regex1.multiline, regex1.flags)
console.log(regex1.source)
// prototype上方法
console.log(regex1.test("xyzzzxyz"))
const r = /x/g, s = '_x_x';
while (r.lastIndex < s.length) {
    console.log(r.lastIndex, r.test(s));
}
// 带有g的修饰符，正则表达式内部会记录上一次的lastIndex属性，所以不要更换要匹配的字符串，会产生难以察觉的错误
const r1 = /bb/g;
console.log(r1.test('bb'));
console.log(r1.test('-bb-'))
// 正则模式是一个空字符串，则匹配所有字符串
console.log(new RegExp("").test('abc'))
// exec
const r2 = /_(x)/;
console.log(r2.exec(s))
// exec g
const r3 = /_(x)/g;
console.log(r3.exec('xx_x_x_x'))
console.log(r3.exec('xx_x_x_x'))
console.log(r3.exec('xx_x_x_x'))
// 匹配结果返回null，正则对象lastIndex变为0，意味着将从头开始匹配
console.log(r3.exec('xx_x_x_x'))
console.log(r3.exec('xx_x_x_x'))
// match()
console.log(s.match(r));
// search()
console.log(s.search(r))