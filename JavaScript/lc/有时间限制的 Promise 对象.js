/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {

    return async function (...args) {
        let timer;
        const timeoutPromise = new Promise((resolve, reject) => {
            timer = setTimeout(() => {
                console.log(1);
                reject("Time Limit Exceeded");
            }, t);
        })
        return Promise.race([fn(...args), timeoutPromise])
            .then(res => {
                clearTimeout(timer);
                return res;
            })
    }
};