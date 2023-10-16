/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
    return new Promise((resolve, reject) => {
        const res = [];
        let cnt = 0;
        functions.forEach((fn, i) => {
            fn().then(val => {
                res[i] = val;
                if (++cnt === functions.length) {
                    resolve(res);
                }
            }).catch(reject);
        })
    })
};