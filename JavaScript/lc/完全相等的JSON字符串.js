/**
 * @param {null|boolean|number|string|Array|Object} o1
 * @param {null|boolean|number|string|Array|Object} o2
 * @return {boolean}
 */
var areDeeplyEqual = function (o1, o2) {
    if ((typeof o1 !== 'object' || o1 === null) || (typeof o2 !== 'object' || o2 === null)) {
        return o1 === o2;
    }


    if (Array.isArray(o1) || Array.isArray(o2)) {
        if (o1.length !== o2.length || !Array.isArray(o2) || !Array.isArray(o1)) return false;
        for (let i = 0; i < o1.length; ++i) {
            if (!areDeeplyEqual(o1[i], o2[i])) {
                return false;
            }
        }
        return true;
    }

    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }
    for (const key in o1) {

        if (!areDeeplyEqual(o1[key], o2[key])) {
            return false;
        }
    }
    return true;
};
