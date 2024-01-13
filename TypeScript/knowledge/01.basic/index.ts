let smallStr = "small";
let bigStr: String = "big";
bigStr = new String("big");

let symbol: Symbol = Object(Symbol())
symbol = Symbol()

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