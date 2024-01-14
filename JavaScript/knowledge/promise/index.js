import { asap } from "./queue";
import { isFunction, needsNew, needsResolver, noop, objectOrFunction } from "./utils";

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function subscribe(parent, child, onFulfillment, onRejection) { // then方法会传递child
    const subs = parent._subs, len = subs.length;
    subs[len] = child, subs[len + FULFILLED] = onFulfillment, subs[len + REJECTED] = onRejection;

    if (len === 0 && parent._state) {
        asap(publish, parent);
    }
}

function invokeCallback(settled, promise, callback, detail) {
    const hasCallback = isFunction(callback);
    let value, error, succeeded = true;

    if (hasCallback) {
        try {
            value = callback(detail);
        } catch (e) {
            succeeded = false;
            error = e;
        }
    } else { // 不是函数就继承父promise的值
        value = detail;
    }

    if (promise._state !== PENDING) return;
    if (hasCallback && succeeded) {
        resolve(promise, value);
    } else if (!succeeded) {
        reject(promise, value);
    } else if (settled === FULFILLED) {
        fulfill(promise, value);
    } else if (settled === REJECTED) {
        reject(promise, value);
    }
}

function publishRejection(promise) {
    if (promise._onerror) {
        promise._onerror(promise._result);
    }
    publish(promise);
}

function publish(promise) {
    const subs = promise._subs, settled = promise._state;
    if (subs.length === 0) return;
    let child, callback, detail = promise._result;
    for (let i = 0; i < subs.length; i += 3) {
        child = subs[i], callback = subs[i + settled];
        if (child) { // 处理then返回的promise
            invokeCallback(settled, child, callback, detail);
        } else {
            callback(detail);
        }
    }
    promise._subs.length = 0;
}

function fulfill(promise, value) {
    if (promise._state !== PENDING) return;
    promise._result = value, promise._state = FULFILLED;
    if (promise._subs.length !== 0) asap(publish, promise);
}

function resolve(promise, value) {
    if (objectOrFunction(value)) {
        let then = value.then;
        if (then._state === FULFILLED) {
            fulfill(promise, then._result);
        } else if (then._state === REJECTED) {
            reject(promise, then._result);
        } else {
            subscribe(then, undefined, val => resolve(promise, val), reason => reject(promise, reason))
        }
    } else {
        fulfill(promise, value);
    }
}

function reject(promise, value) { // 与resolve不同，对value是promise不处理
    if (promise._state !== PENDING) return;
    promise._state = REJECTED, promise._result = value;
    asap(publishRejection, promise);
}

function initializePromise(promise, resolver) {
    try {
        resolver((value) => resolve(promise, value), (reason) => reject(promise, reason));
    } catch (e) {
        reject(promise, e);
    }
}

export default class MyPromise {
    constructor(resolver) {
        this._state = PENDING;
        this._result = undefined;
        this._subs = [];

        if (resolver !== noop) {
            typeof resolver !== 'function' && needsResolver();
            this instanceof Promise ? initializePromise(resolver) : needsNew()
        }
    }
    then(onFulfillment, onRejection) {
        const parent = this,
            child = new this.constructor(noop),
            state = parent._state;
        if (state) {
            const callback = arguments[state - 1];
            asap(() => invokeCallback(state, child, callback, parent._result));
        } else {
            subscribe(parent, child, onFulfillment, onRejection);
        }
    }
    catch(onRejection) {
        return this.then(null, onRejection);
    }
    finally(callback) {
        let promise = this;
        if (isFunction(callback)) {
            return promise.then(val => resolve(callback()).then(() => val), reason => reject(callback()).then(() => { throw reason }));
        }
        return promise.then(callback, callback);
    }
    race(entries) {
        const Cons = this;
        if (!Array.isArray(entries)) {
            return new Cons((_, reject) => reject());
        } else {
            return new Cons((resolve, reject) => {
                entries.forEach(entry => {
                    Cons.resolve(entry).then(resolve, reject);
                })
            })
        }
    }
}

MyPromise.reject = (object) => {
    const Constructor = this;
    const promise = new Constructor(noop);
    reject(promise, object);
    return promise;
};
MyPromise.resolve = (object) => {
    const Constructor = this;
    const promise = new Constructor(noop);
    resolve(promise, object);
    return promise;
};
MyPromise.race = (entries) => {
    const Cons = this;
    if (!Array.isArray(entries)) {
        return new Cons((_, reject) => reject());
    } else {
        return new Cons((resolve, reject) => {
            entries.forEach(entry => {
                Cons.resolve(entry).then(resolve, reject);
            })
        })
    }
}
MyPromise.all = (entries) => {
    const Cons = this;
    const promise = new Cons();
    if (!Array.isArray(entries)) {
        reject(promise);
    } else {
        const len = entries.length;
        _result = new Array(len);
        let remain = len;
        if (len === 0) fulfill(promise, _result);
        for (let i = 0; i < len; ++i) {
            MyPromise.resolve(entries[i]).then((value) => {
                --remain;
                _result[i] = value;
                if (remain === 0) {
                    fulfill(promise, _result);
                }
            }, (err) => {
                reject(promise, err);
            })
        }
    }
    return promise;
}