/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    if (n <= 0) return arr;
    return arr.reduce((prev, item) => {
        item instanceof Array ? prev.push(...flat(item, n - 1)) : prev.push(item);
        return prev;
    }, []);
};

// 循环
flat = function (arr, n) {
    while (n > 0 && arr.some(Array.isArray)) {
        arr = [].concat(...arr);
        -- n;
    }
    return arr;
}