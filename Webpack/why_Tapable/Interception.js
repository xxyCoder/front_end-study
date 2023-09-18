const { SyncHook } = require("tapable");

const hook = new SyncHook(['arg1', 'arg2', 'arg3'])
// 拦截器
hook.intercept({
    // 通过tap、tapAsync、tapPromise注册的时候触发
    register: (tapInfo) => {
        console.log(`${tapInfo.name} is doing its job`);
        return tapInfo;
    },
    // hook.call 时候触发
    call: (arg1, arg2, arg3) => {
        console.log('Starting to calc');
    },
    // 被注册函数调用之前执行
    tap: (tap) => {
        console.log('tap', tap);
    },
    // loop型钩子中每次重新开始loop之前执行，参数为调用时候传入
    loop: (...args) => {
        console.log('loop', args)
    }
})

hook.tap({ name: 'f1' }, (arg1, arg2) => {
    console.log('f1', arg1, arg2)
})
// before属性，传入一个数组或字符串，值为注册事件对象时的名称
hook.tap({ name: 'f2', before: 'f1' }, (arg1, arg2) => {
    console.log('f2', arg1, arg2)
})
// stage 值为数字，越大表示执行函数执行越晚，支持负数，默认为0，同时使用before与stage，优先处理before，满足before之后处理stage
hook.tap({ name: 'f3', stage: 2 }, (arg1, arg2) => {
    console.log('f2', arg1, arg2)
})
hook.call('xxyCoder', 21);