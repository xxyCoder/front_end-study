Function.prototype.myCall = function (thisArg, ...args) {
    // 没有定义则指向全局对象
    if (thisArg === undefined || thisArg === null) {
        thisArg = typeof window === 'undefined' ? global : window;
    }
    thisArg = Object(thisArg);
    // 外界无法访问，且不会覆盖fn中的属性
    const key = Symbol('fn');
    thisArg[key] = this;    // this即调用的函数
    const result = thisArg[key](...args);
    // 避免污染
    delete thisArg[key];
    return result;
}

Function.prototype.myApply = function (thisArg, args) {
    // 没有定义则指向全局对象
    if (thisArg === undefined || thisArg === null) {
        thisArg = typeof window === 'undefined' ? global : window;
    }
    thisArg = Object(thisArg);
    // 外界无法访问，且不会覆盖fn中的属性
    const key = Symbol('fn');
    thisArg[key] = this;    // this即调用的函数
    const result = thisArg[key](...args);
    // 避免污染
    delete thisArg[key];
    return result;
}

Function.prototype.myBind = function (thisArg, ...outerArgs) {
    const that = this;
    // 构造原型链
    const F = function () { };
    F.prototype = this.prototype;
    const newFunc = function (...innerArgs) {
        const args = [...outerArgs, ...innerArgs];
        console.log("args", args)
        return that.apply(this instanceof F ? this : thisArg, args);
    }
    newFunc.prototype = F.prototype;
    return newFunc;
}

function test(...args) {
    console.log(args, this.a);
}

const nf = test.myBind({ a: 1 }, 123, 456);
nf(796)