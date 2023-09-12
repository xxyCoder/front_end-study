import { track, trigger } from "./effect";

export function isPlainObj(value: any): value is Object {
    return typeof value === 'object' && value !== null;
}

const reactive = (obj) => {
    // 传入非对象
    if (!isPlainObj(obj)) {
        return obj;
    }
    const proxy = new Proxy(obj, {
        get(target, key, receiver) {
            // 进行依赖收集
            track(target, 'get', key);
            const result = Reflect.get(target, key, receiver);
            // 如果是对象，则会递归处理
            if (isPlainObj(result)) {
                return reactive(result);
            }
            return result;
        },
        set(target, key, value, receiver) {
            const oldValue = target[key];
            const result = Reflect.set(target, key, value, receiver);
            if (value !== oldValue) {
                // 触发更新
                trigger(target, 'set', key, value, oldValue);
            }
            return result
        }
    });

    return proxy;
}