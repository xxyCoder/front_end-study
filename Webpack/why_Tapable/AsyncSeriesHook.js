const { AsyncSeriesHook } = require("tapable");

const hook = new AsyncSeriesHook(['arg1', 'arg2', 'arg3'])

console.time('timer');
// 参数结尾额外接受回调函数
hook.tapAsync('f1', (arg1, arg2, arg3, callback) => {
    console.log('f1:', arg1, arg2, arg3)
    setTimeout(() => {
        // 执行callback表示本次事件f1完成
        callback();
    }, 1000)
})

hook.tapPromise('f2', (arg1, arg2, arg3) => {
    console.log('f2:', arg1, arg2, arg3);
    return new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })
})

hook.callAsync('xxyCoder', 21, 'student', (err, data) => {
    console.log('done');
    console.timeEnd('timer')
})
