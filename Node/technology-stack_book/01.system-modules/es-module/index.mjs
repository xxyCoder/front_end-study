import { add } from './calc.mjs'
const pro = await import("./promise.mjs")
console.log(pro.hello);
console.log(pro.node)
pro.default()

console.log(add(1, 2))