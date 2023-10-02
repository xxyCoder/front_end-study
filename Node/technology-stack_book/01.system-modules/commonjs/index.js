console.log('b.js', this)
exports.test = 2;
const a = require('./index.module')
exports.bbb = 'b'

setTimeout(() => {
    this.bbb = "aaa";
    this.y = 2;
}, 5000)
console.log('undeclaredVariable: ', undeclaredVariable);

console.log('b模块加载完毕: a.test值:', a.test);

console.log("b cache :", require.cache)