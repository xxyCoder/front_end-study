const methods = ["pop", "push", "shift", "unshift", "splice", "sort", "reverse"];

const handler = {
    get(target, p) {
        if (methods.indexOf(p) !== -1) {
            return () => {
                throw `Error Calling Method: ${p}`
            }

        }
        return target[p];
    },

    set(target, p) {
        if (Array.isArray(target)) {
            throw `Error Modifying Index: ${p}`
        }
        throw `Error Modifying: ${p}`
    }
}

/**
 * @param {Object|Array} obj
 * @return {Object|Array} immutable obj
 */
var makeImmutable = function (obj) {
    const newObj = Array.isArray(obj) ? [] : {};
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; ++i) {
            newObj[i] = makeImmutable(obj[i]);
        }
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            newObj[key] = makeImmutable(obj[key]);
        }
    } else {
        return obj;
    }
    return new Proxy(newObj, handler);
};

