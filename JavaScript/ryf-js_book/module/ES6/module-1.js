export var name = "xxy";
export var age = 21;

var number = 666666;
var country = "China"
export {
    number,
    country
}

export function add(a, b) {
    return a + b;
}
// 重命名
function v1() { };
function v2() { };
export {
    v1 as functionV1,
    v2 as functionV2,
    v2 as functionVV2
}
// error
// export 1
// var m = 1;
// export m;
// function f() { }
// export f;
// class C { }
// export C;

// 动态值
export var foo = "bar";
setTimeout(() => foo = "foo", 2000);
console.log("module-1.js");
// 默认输出
export default function () {
    console.log("default");
}