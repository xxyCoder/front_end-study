let smallStr = "small";
let bigStr: String = "big";
bigStr = new String("big");

let symbol: Symbol = Object(Symbol())
symbol = Symbol()
const us: unique symbol = Symbol(5)

let a: any = "hell0"
let aa: number = a

let u: unknown = 1
// u + 1
u === 1
if (typeof u === 'number') {
  u + 1
}
u = { name: "xxx", get age() { return 0 } };
// u.name

let Obj: Object = 1
let obj: object = {};
obj = () => ({});
// obj = 1

const x = 5;
let y: typeof x = (4 + 1) as 5

let union: string | number = 123;
union.toPrecision(2)

function printId(id: number | string) {
  id.valueOf()
  if (typeof id === 'string') {
    id.toLowerCase()
  } else {
    id.toFixed(2)
  }
}

let n: number & string

type A = { foo: string };
type B = A & { bar: number }
let inter: B = {
  foo: "foo",
  bar: 1
}

type Age = number;
// type MyAge = typeof Age
type func = typeof printId

const arr1: number[] = []
const arr2: (string | number)[] = []
const arr3 = [];
arr3.push(1)
const arr4: readonly number[] = [1, 2, 3]
// arr4[0] = 0
const arr5: ReadonlyArray<number> = [1, 2, 3]
const arr6: number[] = [1, 2, 3] as const;
arr6[0] = 0
arr6[3] = 3

const tup1: [number, string?] = [1]
const tup2: [string, ...number[]] = ["xxx", 1, 2]
tup2[3] = 1
type tup = typeof tup2[number] // 取元组全部类型
const tup3: readonly [number] = [1]
// tup3[1] = '0'

export { }