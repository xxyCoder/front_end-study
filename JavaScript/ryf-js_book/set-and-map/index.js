// Set
const s = new Set([1, 2, 3, NaN])
s.add(NaN, s.size);

console.log(s)

const a = new Set([1, 2, 3, 3, 4]), b = new Set([3, 5, 1, 2]);
// 并集
console.log(new Set([...a, ...b]))
// 交集
console.log(new Set([...a].filter(x => b.has(x))));
// 差集
console.log(new Set([...a].filter(x => !b.has(x))));

// WeakSet
const ws = new WeakSet([[1, 2, 3], {}])

// Map
const m = new Map([["key", "val"], ["name", "xxyCoder"]])
// 转换为数组
const arr = [...new Map().set(true, 7).set({ foo: 3 }, ['abc'])]
console.log(arr);
// 转换为对象
function strMapToObj(strMap) {
    const obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
// 对象转换为Map
console.log(new Map(Object.entries({ "A": 'a', "B": 'b' })));
// Map转换为JSON
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap))
}
// Json转换为Map
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr))
}

// WeakRef
const target = {};
const wr = new WeakRef(target)

// FinalizationRegistry
const registry = new FinalizationRegistry(v => {
    console.log(v); // v的值是注册观察对象的时候传入的第二个参数
})
// 注册观察对象
const obj = {}
registry.register(obj, "delete")