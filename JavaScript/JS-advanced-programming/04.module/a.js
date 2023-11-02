const b = require("./b")

b.b = "A";
function print() {
    console.log("a.js");
    return "A";
}

let obj = {
    x: {
        name: "xxyCoder"
    }
}

module.exports = {
    print: print,
    a: "a",
    obj
}


setTimeout(() => {
    obj = {
        x: {
            name: "xxy"
        }
    }
}, 5000);

console.log("a module:", module);