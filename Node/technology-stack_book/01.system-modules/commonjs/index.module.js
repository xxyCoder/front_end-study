console.log('a.js')
exports.test = 1;
let x = 1;
undeclaredVariable = 'a模块未声明变量'  // 未声明变量，相当于全局变量

const b = require('./index')
console.log('a模块加载完毕: :', b.test, b.bbb);
console.log("a cache: ", require.cache)
setTimeout(() => {
    console.log("6s b=", b, this);
}, 6000)