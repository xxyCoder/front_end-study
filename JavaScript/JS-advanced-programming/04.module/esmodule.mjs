import a, { obj } from './a.mjs'

console.log("es module:", a, obj.x);
setTimeout(() => {
    console.log("x:", obj.x);
}, 6000);