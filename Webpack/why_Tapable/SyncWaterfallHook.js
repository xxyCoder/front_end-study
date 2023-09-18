const { SyncWaterfallHook } = require("tapable");

const hook = new SyncWaterfallHook(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1:', arg1, arg2, arg3)
    // 存在返回值，修改flag2的参数值，仅仅能修改第一个参数的值
    return 'xxy'
})

hook.tap("flag2", (arg1, arg2, arg3) => {
    console.log('flag2:', arg1, arg2, arg3)
})

hook.tap("flag3", (arg1, arg2, arg3) => {
    console.log('flag3:', arg1, arg2, arg3)
})

hook.call("xxyCoder", 21, "student")