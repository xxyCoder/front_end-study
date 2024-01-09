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

interface T {
    [key: string]: string;
}
type t = keyof T

type t1 = keyof ({ a: string, c: boolean } | { b: string, c: boolean })
type t2 = keyof ({ a: string, c: boolean} & { b: string, c: boolean })
// 返回值的联合类型
interface MyObj {
    foo: number;
    bar: string;
}
type t3 = MyObj[keyof MyObj]

// in
type Options<T extends object> = {
    [K in keyof T]?: T[K]
}

// 条件运算符
type t4 = 1 extends number ? true : false;

// is
const myNum = {
    add(num1: number, num2: number): number {
        return num1 + num2;
    }
}

interface myNum {
    add(num1: number, num2: number): number
}

function isNumber(num: any): num is myNum {
    return typeof num.add !== 'undefined'
}
let x;
if (isNumber(x)) {
    x.add(1, 2)
}

// satisfies
type Colors = "red" | "blue" | "green"
const plattes = {
    red: "red",
    green: "green",
    blue: [0, 0, 255]
} satisfies Record<Colors, string | number[]>

// mapping
type X = {
    foo: number
}
type MP = {
    [P in keyof X as `${P}ID`]?: T[P]
}
type Filter<T> = {
    [K in keyof T as T[K] extends string ? K : never] : string
}

// Awaited<T>
type MyAwaited<T> =
  T extends null | undefined ? T :
  T extends object & {
    then(
      onfulfilled: infer F,
      ...args: infer _
    ): any;
  } ? F extends (
    value: infer V,
    ...args: infer _
  ) => any ? Awaited<V> : never
  : T;

// ConstructorParameters<T>
type MyConstructorParameters<T extends abstract new (...args: any) => any> = 
    T extends abstract new (...args: infer P) => any ? P :never;

// Exlude
type MyExculde<U, T> = U extends T ? never : U;

// Extract
type MyExtract<U, T> = U extends T ? U : never;

// InstanceType
type MyInstanceType<T extends abstract new(...args: any) => any> = 
    T extends abstract new (...args: any) => infer R ? R : never;

// NonNullable
type MyNonNullable<T> = T & {}

// Pick
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

// Omit
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// ThisParameterType
type MyThisParameterType<T> = 
    T extends (this: infer U, ...args: any) => any ? U : unknown;

// OmitThisParameter
type MyOmitThisParameter<T> = 
    unknown extends ThisParameterType<T> ? T : 
    T extends (...args: infer A) => infer R ?
    (...args: A) => R : T

// Parameter
type MyParametes<T extends (...args: any) => any> = 
    T extends (...args: infer P) => any ? P : never

// Partial
type MyPartial<T> = {
    [P in keyof T]?: T[P]
}

// Readonly
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}

// Record
type MyRecord<K extends string|number|symbol, T> = {
    [P in K]: T
}

// Required
type MyRequired<T> = {
    [P in keyof T]-?: T[P]
}

// ReadonlyArray
interface MyReadonlyArray<T> {
    readonly length: number;
    readonly [n: number]: T
}

// ReturnType
type MyReturnType<T extends(...args: any) => any> = 
    T extends (...args: any) => infer R ? R : any;
