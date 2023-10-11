// 创建集合
const s1 = new Set();
const s2 = new Set([1, 2, 3, 4, 5]);

s1
    .add(1)
    .add(2)

console.log(s1.size)
if (s1.has(1)) {
    s1.delete(1);
} else {
    s1.clear();
}

for (const s of s1) {
    console.log(s)
}