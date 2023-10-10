
var TimeLimitedCache = function () {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
    const cur = +new Date();
    let sc;
    if (!this.cache.has(key)) {
        this.cache.set(key, [value, cur + duration]);
        sc = false;
    } else {
        const arr = this.cache.get(key);
        if (arr[1] < cur) {
            sc = false;
        } else {
            sc = true;
        }
        arr[0] = value, arr[1] = cur + duration;
    }
    return sc;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
    if (!this.cache.has(key)) {
        return -1;
    }
    const cur = +new Date(), arr = this.cache.get(key);
    if (arr[1] < cur) {
        return -1;
    }
    return arr[0];
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
    const cur = +new Date();
    let cnt = 0;
    for (const [k, arr] of this.cache) {
        if (arr[1] > cur) {
            ++cnt;
        }
    }
    return cnt;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */