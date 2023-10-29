// 普通函数用法，即使带有参数，也返回当前时间
console.log(Date())
// 构造函数用法
// 年 月 日 时 分 秒 毫秒 月从0开始计算
console.log(new Date(2002, 2, 1))
// 参数是负整数，表示1970年之前
console.log(new Date(-1))
// 能被date.parse方法解析的字符串也可以作为参数
console.log(new Date("2002-3-14"))

// 运算
const d1 = new Date(2002, 2, 13), d2 = new Date();
console.log(d2 - d1, d2 + d1);

// 静态方法
console.log(Date.now());
console.log(Date.parse("2002-03-13"))   // 解析失败返回NaN

// GET方法
// getDate拿到日，getDay拿到星期几
console.log(d1.getDate(), d1.getFullYear(), d1.getMonth(), d1.getDay(), d1.getHours(), d1.getMinutes(), d1.getSeconds(), d1.getMilliseconds());