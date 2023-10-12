/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Promise<any>}
 */
var promisePool = async function (functions, n) {
    await Promise.all([...new Array(n)].map(async () => {
        while (functions.length > 0) {
            await functions.shift()();
        }
    }))
};