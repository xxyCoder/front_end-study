/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = args.join(",");
        if (cache.has(key)) {
            return cache.get(key);
        }
        const value = fn(...args);
        cache.set(key, value);
        return value;
    }
}