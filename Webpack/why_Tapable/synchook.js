const { SyncHook } = require("tapable");

// 接受一个字符串数组作为参数
const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// 注册事件，第一个参数是标志位，没有任何意义，也可以是对象，第二个参数是本次注册的函数
hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1:', arg1, arg2, arg3)
})

hook.tap('flag2', (arg1, arg2, arg3) => {
    console.log('flag2:', arg1, arg2, arg3)
})

hook.tap('flag3', (arg1, arg2, arg3) => {
    console.log('flag3:', arg1, arg2, arg3)
})
// 执行方法并传入对应参数
hook.call("xxyCoder", 21, "student");

