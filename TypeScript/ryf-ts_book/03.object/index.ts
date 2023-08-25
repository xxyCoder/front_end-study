// 写法一
const obj1: {
    x: number;
    y: number;
    add(a: number, b: number): number;
    sub: (a: number, b: number) => number
} = {
    x: 1.0,
    y: 10,
    add(a, b) { return a + b },
    sub(a, b) { return a - b }
}
// 写法二
type MyObj2 = {
    x: number;
    y: number;
    add(a: number, b: number): number;
    sub: (a: number, b: number) => number
}
const obj2: MyObj2 = {
    x: 1.0,
    y: 10,
    add(a, b) { return a + b },
    sub(a, b) { return a - b }
}
// 写法三
interface MyObj3 {
    x: number;
    y: number;
    add(a: number, b: number): number;
    sub: (a: number, b: number) => number
}
const obj3: MyObj3 = {
    x: 1.0,
    y: 10,
    add(a, b) { return a + b },
    sub(a, b) { return a - b }
}

interface MyInterface {
    toString(): string; // 继承属性
    prop: number;   // 自身属性
}
const obj4: MyInterface = {
    prop: 666
}
// 解构
let { x, y }: { x: number, y: number } = obj1;
// 子类型
let A: {
    x: number;
};
let B: {
    x: number;
    y: number;
} = {
    x: 1,
    y: 2
};
A = B;
// 空对象
const obj = {};
// obj.prop = 123; error