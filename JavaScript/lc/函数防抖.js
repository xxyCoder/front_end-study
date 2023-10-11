/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
    let timeId = null;
    return function (...args) {
        if (timeId) {
            clearTimeout(timeId);
            timeId = null;
        }
        timeId = setTimeout(() => {
            fn(...args);
        }, t)
    }
};