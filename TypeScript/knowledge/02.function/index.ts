function say(message: string): void {
    console.log(message);
}
// 变量被赋值函数，写法一
const f1 = function (message: string) {
    console.log(message);
}
// 变量被赋值函数，写法二
const f2: (message: string) => void = function (message) {
    console.log(message)
}
// 变量被赋值函数，写法三，用于函数本身存在属性(完全就是对象了)
const f3: {
    (msg: string): void;
    version?: number
} = function (message) {
    console.log(message)
}
// 子类型
let x: (a: string) => void = say;
let y: (a: string, b: number) => void;
y = x;
// 函数的属性
function f(x: number) {

}
f.version = 1.0;
let foo: {
    (x: number): void;
    version: number
} = f;
// 可选参数
function fk(x?: number): number | undefined {
    return x;
}
function fk2(x: number | undefined) {
    return x;
}
// fk2();  error， 反之不行
// 参数解构
function sum({ a, b, c }: {
    a: number,
    b: number,
    c: number
}) {
    return a + b + c;
}
// rest参数为数组
function joinNumbers(...args: number[]) { };
// rest参数为元组
function fy(...args: [boolean, number]) { };
// 只读参数
function fnr(arr: readonly number[]) { };
// 构造函数
class Animal {
    numLength: number = 4;
}
type AnimalConstructor = new () => Animal;
function create(c: AnimalConstructor): Animal {
    return new c();
}

// 函数重载
function reverse(str: string): string;
function reverse(arr: any[]): any[];
function reverse(strOrArr: string | any[]): string | any[] {
    if (typeof strOrArr === 'string') {
        return strOrArr.split('').reverse().join('');
    } else {
        return strOrArr.reverse()
    }
}

// 重载顺序
function cf(x: any): number;
function cf(x: string): 0 | 1;
function cf(x: any): any {}

// const a:0|1 = cf('hi'); // 报错

// this问题
function fn(this: { name: string }) {
    console.log(this.name);
}
fn.call({ name: 'xxy' })

export { }