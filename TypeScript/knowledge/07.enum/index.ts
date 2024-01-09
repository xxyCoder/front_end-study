enum Color {
    // Right = "Right",
    Red,
    Green = 10,
    Blue,
    Yellow = "Yellow",
    Black = 1 << 20
}

// 编译之后
// let Color = {
//     Red: 0,
//     Green: 10,
//     Blue: 11,
//     Yellow: "Yellow"
// }

let c1: Color = Color.Blue
let c2: number = Color.Green

enum Foo {
    A,
    B
}
enum Foo {
    C = 1
}

// keyof 取出所有Enum结构的所有成员名
enum MyEnum {
    A = 'a',
    B = 'b'
}
type t = typeof MyEnum;
const m: t = MyEnum;
type ab = keyof typeof MyEnum

// 反向映射 通过成员值获取成员们
console.log(MyEnum['a'])

// const 枚举
const enum Greeting {
    Hello = "Hi"
}

// as const
enum FOO {
    A = 1.1,
    B,
    C
}
const BAR = {
    A: 1.1,
    B: 2.1,
    C: 3.1   
} as const;
