function newOperator(Constructor, ...args) {
    // 创建一个对象，新对象的原型赋值为构造函数的prototype
    let thisValue = Object.create(Constructor.prototype);
    // 调用函数，并将this改为新对象
    const result = Constructor.apply(thisValue, args);
    // 如果返回值是对象，则返回该对象，否则返回新对象
    return typeof result === 'object' && result !== null ? result : thisValue;
}

function instanceOf(obj, classFunction) {
    if (typeof obj === 'undefined' || obj === null) {
        return false;
    }
    if (typeof obj !== 'object') {
        obj = Object(obj);
    }
    while (obj) {
        if (obj.constructor === classFunction) {
            return true;
        }
        obj = Object.getPrototypeOf(obj);
    }
    return false;
}

// 自定义判别符号
function myTypeOf(value) {
    if (typeof value !== 'object' || typeof value === 'function') {
        return (typeof value).toLowerCase();
    }
    let result = Object.prototype.toString.call(obj);
    return result.slice("[Object ".length, result.length - 1).toLowerCase();
}