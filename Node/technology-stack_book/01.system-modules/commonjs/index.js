console.log('b.js')
exports.test = 2;
const a = require('./index.module')
exports.bbb = 'b'
console.log('undeclaredVariable: ', undeclaredVariable);

console.log('b模块加载完毕: a.test值:', a.test);

console.log("b cache :", require.cache)