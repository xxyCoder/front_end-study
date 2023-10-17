/**
 * @param {null|boolean|number|string|Array|Object} obj1
 * @param {null|boolean|number|string|Array|Object} obj2
 * @return {null|boolean|number|string|Array|Object}
 */
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
var deepMerge = function (obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2) || Array.isArray(obj1) !== Array.isArray(obj2)) return obj2;
    for (const key in obj2) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
    }
    return obj1;
};