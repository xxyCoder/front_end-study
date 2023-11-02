const a = require('./a');
const a2 = require("./a");
const b = require("./b");

console.log(a === a2, a);

// a.a = "A";
console.log(a.a, a2.a, b.b, Object.isFrozen(a));

module.exports = {
    A: a.print()
}

console.log("commonJS module:", module);
setTimeout(() => {
    console.log("x:", a.obj.x);
}, 6000);