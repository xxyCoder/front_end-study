// 创建数组
const arr1 = new Array(20);
const arr2 = new Array("red", "blue", "green");
const arr3 = [];

// 静态方法
console.log(Array.from("xxyCoder", function (v, i) {
    console.log(v, '---', i, '--->', this.ori);
    return v + v;
}, { ori: "xxyCoder" }))
console.log(Array.of(1, 2, 3, 4))

// 空位问题
const options = [1, , , , 5]
for (const option of options) {
    console.log(option === undefined)
}

// 实例方法
arr1.fill(5, 0, 10)
arr1.copyWithin(10, 0, 10)
console.log(arr1, arr1.toString())