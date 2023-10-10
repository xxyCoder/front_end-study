/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
    if (obj === null || typeof obj === 'undefined' || classFunction === null || typeof classFunction === 'undefined') {
        return false;
    }
    // 不使用obj作为判断，可能obj是假类型无法进入while
    while (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj) !== classFunction.prototype) {
        console.log(obj.__proto__)
        obj = Object.getPrototypeOf(obj);
    }
    return Object.getPrototypeOf(obj) === classFunction.prototype
};