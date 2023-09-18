const { SyncBailHook } = require("tapable");

const hook = new SyncBailHook(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('f1:', arg1, arg2, arg3)
    return true;
})

hook.tap("flag2", (arg1, arg2, arg3) => {
    console.log('f2:', arg1, arg2, arg3)
})

hook.call("xxyCoder", 21, "student")