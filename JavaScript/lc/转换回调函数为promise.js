/**
 * @param {Function} fn
 * @return {Function<Promise<number>>}
 */
// 编写一个函数，接受另一个函数 fn ，并将基于回调函数的函数转换为基于 Promise 的函数。
var promisify = function (fn) {

    return async function (...args) {
        return await new Promise((resolve, reject) => {
            fn((data, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }, ...args);
        })
    }
};