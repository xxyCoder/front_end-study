/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var throttle = function (fn, t) {
    let timerId = null;
    let prev = 0;
    let newArgs;
    return function (...args) {
        const cur = +Date.now();
        const remain = t - (cur - prev);
        newArgs = args;
        if (remain <= 0) {
            clearTimeout(timerId);
            prev = cur;
            fn.apply(this, newArgs);
        } else if (!timerId) {
            timerId = setTimeout(() => {
                prev = +Date.now();
                fn.apply(this, newArgs);
                timerId = null;
            }, remain);
        }
    }
};