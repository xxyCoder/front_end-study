function getFirst<T>(arr: T[]): T {
    return arr[0];
}
// 隐式推断
getFirst([1, 2, 3])

function comb<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.concat(arr2);
}
// 无法推断，显示给出
comb<string | number>([1, 2, 3], ['a', 'b'])
// 多类型参数
function map<T, U>(
    arr: T[],
    f: (args: T) => U
): U[] {
    return arr.map(f);
}
map([1, 2, 3], (n) => n * 2.1)
// 变量类型定义
function id<T>(args: T): T {
    return args;
}
let myId_1: <T>(args: T) => T = id;
let myId_2: { <T>(args: T): T } = id;
// 接口泛型
interface B<T> {
    content: T;
    compareTo(value: T): boolean
}
class C implements B<number> {
    content: number;
    compareTo(value: number): boolean {
        return this.content === value
    }
}
interface Fn {
    <T>(agrs: T): T;
}
let myId_3: Fn = id;
// 类的泛型参数
class Pair<T, U> {
    key: T;
    value: U;
}
class A extends Pair<number, string> {

}
let p = new Pair<string, number>();
// 类型别名泛型
type Nullable<T> = T | undefined | null;
type Container<T> = {
    value: T
}
const a: Container<number> = {
    value: 0
}
// 泛型的约束条件
function comp<T extends { length: number }>(a: T, b: T) {
    if (a.length <= b.length) {
        return a;
    } else {
        return b;
    }
}
// 可以引用其他参数，但是不能引用自身
function conn<T extends U, U>(a: T, b: U): void {

}
// 泛型可以嵌套
type orNull<T> = T | null;
type oneOrMany<T> = T | T[];
type oneOrManyOrNull<T> = orNull<oneOrMany<T>>

// keyof
const obj = {
    name: "xxyCoder",
    age: 21
};
function getValue<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
// for in
type Options<T extends object> = {
    [K in keyof T]?: T[K]
}