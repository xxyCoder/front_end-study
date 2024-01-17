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

const obj5 = {
    name: "xxy"
} as const;

// const point1: {
//     x: number;
//     y: number;
// } = {
//     x: 1,
//     y: 1,
//     z: 1 // 报错
// };

const myPoint = {
    x: 1,
    y: 1,
    z: 1
};

const point2: {
    x: number;
    y: number;
} = myPoint; // 正确

const point3: {
    x: number;
    y: number;
} = {
    x: 1,
    y: 1,
    z: 1
} as { x: number, y: number, z: number };

type Options = {
    title: string;
    darkMode?: boolean;
};

// const obj6: Options = {
//     title: '我的网页',
//     darkmode: true, // 报错
// };

let myOptions = {
    title: '我的网页',
    darkmode: true,
};
// 如果没有严格字面量规则，就不会报错，因为darkMode是可选属性，根据结构类型原则，任何对象只要有title属性，都认为符合Options类型
const obj7: Options = myOptions;

type OptionsPair = {
    a?: number;
    b?: number;
    c?: number;
};

const opts = { d: 123 };

// const obj8: OptionsPair = opts; // 报错

export { }