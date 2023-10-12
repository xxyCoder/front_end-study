/**
 * @param {null|boolean|number|string|Array|Object} object
 * @return {string}
 */
var jsonStringify = function (object) {
    if (object === null) {
        return "null";
    }
    if (Array.isArray(object)) {
        const elements = object.map((element) => jsonStringify(element));
        return `[${elements}]`;
    }
    if (typeof object === 'object') {
        const keys = Object.keys(object);
        const keyValuePairs = keys.map(key => `"${key}":${jsonStringify(object[key])}`);
        return `{${keyValuePairs}}`;
    }
    if (typeof object === 'string') {
        return `"${object}"`;
    }
    return String(object);
};