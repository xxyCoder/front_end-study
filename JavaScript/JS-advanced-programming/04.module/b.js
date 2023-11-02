const a = require("./a");

console.log("b:", a);

function print() {
    console.log("b.js");
    return "B";
}

module.exports = {
    print: print,
    b: "b"
}
console.log("b module:", module);