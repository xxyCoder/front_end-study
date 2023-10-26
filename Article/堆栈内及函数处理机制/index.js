const obj = {
    x: 1,
    [Symbol.toPrimitive]: function () {
        console.log("Symbol.toPrimitive");
        return 1;
    },
    toString: function () {
        console.log("toString");
        return 1;
    },
    valueOf: function () {
        console.log("valueOf");
        return [1, 2, 3];
    }
};

if (Number(obj) === 1) {
    console.log("equal");
}

var a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
    console.log("OK");
}

// 数据劫持方式
var i = 0;
Object.defineProperty(global, "b", {
    get() {
        return ++i;
    }
})
if (b === 1 && b === 2 && b === 3) {
    console.log("OK");
}