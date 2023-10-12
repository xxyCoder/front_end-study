// 查看是否有迭代器
const arr = [1, 2, 3, [4, 5], 6];
const obj = { x: 1 }
console.log(arr[Symbol.iterator], obj[Symbol.iterator])

// 实现迭代器
class Iterator {
    constructor(arr) {
        this.arr = arr;
    }
    [Symbol.iterator]() {
        let idx = 0, limits = this.arr.length;
        console.log("iterator");
        return {
            next() {
                console.log("next")
                return { done: idx === limits, value: idx === limits ? undefined : arr[idx++] }
            },
            return() {
                console.log("return");
                return { done: true }
            }
        }
    }
}
const it = new Iterator(arr);
for (const v of it) {
    console.log(v)
    if (v === 3)    break;
}
for (const v of it) {
    console.log(v)
}