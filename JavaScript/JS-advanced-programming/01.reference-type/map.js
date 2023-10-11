// 创建map
const m1 = new Map([["k1", "v1"], ["k2", "v2"]]);
const m2 = new Map();

// 添加值
m2
    .set("k3", "v3")
    .set("k4", "v4")
    .set(NaN, NaN)
    .set(NaN, undefined)
    .set(null, null)

console.log(m2.size);
if (m2.has("k3")) {
    console.log(m2.get("k3"));
    m2.delete("k3")
} else {
    m2.clear();
}

for (const [k, v] of m2) {
    console.log(k, "--->", v)
}

// weakMap
const arr = [1, 2, 3];
const obj = { x: 1 };
const wm = new WeakMap();
wm
    .set(arr, 3)
    .set(obj, { x: 1 })

if (wm.has(arr)) {
    console.log(wm.get(arr));
    wm.delete(arr);
} 