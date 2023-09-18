function f1(s) {
    console.log(s);
}
f1("hello")
// 函数表达式可以不带名字
const f2 = function (s) {
    console.log(s);
}
// 如果带有名字，则该函数名只能内容使用
const f3 = function x() {
    // 内部注释
    console.log(typeof x);
}
f3();
// x();
// Function 构造函数，最后一个参数为函数体，其余为函数的参数
const f4 = new Function('x', 'y', 'return x + y');
console.log(f4(1, 2))
// 函数重复声明，则后面覆盖前面，由于函数名的变量提升，前一次的声明都无效
function f1() {
    console.log('override')
}
// 函数的属性和方法
// 函数的名字，对于函数表达式，返回的其名字，该名字只能内部可用，真正的函数名还是变量名
console.log(f1.name, f2.name, f3.name, f4.name)
// length属性，返回函数的预期传入参数个数，与实际传入无关
console.log(f1.length, f4.length)
// toString() 返回函数的源码，内部注释也可以返回
console.log(f3.toString())
// 对于原生函数返回 { [native code] }
console.log(Math.sqrt.toString())
// caller 返回对该函数的引用，即该函数调用了当前函数
// 函数本身作用域，即其声明所在作用域，与调用位置无关
var a = 1;
const x = function () {
    console.log(a);
    console.log(x.caller === y)
}
function y() {
    var a = 2;
    x();
}
y();
// 同名参数，取最后出现的
function aa(a, a) {
    console.log(a);
    // 要调用同名参数，但不是最后一个，可用使用arguments
    console.log(arguments[0])
}
aa(100, 200)
// arguments.length 可以判断调用的时候实际传入多少个参数
function args(a, b, c) {
    console.log(arguments.length);
    console.log(args.length)
}
args(1, 2)
// argument.callee 属性，返回它所对应的原函数
function cal() {
    console.log(arguments.callee === cal)
}
cal();
// 立即调用的函数表达式，当作表达式可以直接加圆括号
const f5 = function f() { }();
// function f() { } (); 如果function出现在首行，一律解释成语句，故不应该以（）结尾
(function f() { })();   // 分号必须，连着两个立即调用表达式没有分号则报错
(function f() { }());
// eval命令，接受一个字符串作为参数，并将字符串当中语句执行，无法当成语句则报错
eval("var name = 'xxyCoder'")
console.log(name);
// eval没有自己的作用域，可能会修改当前作用域
eval(" a = 2 ");
console.log(a);
// 如果使用严格模式，eval内部声明变量不会影响外部作用域，但仍然可以读写当前作用域
(
    function f() {
        'use strict';
        eval("a = 3");
        var foo = "foo";
        eval("foo = 'bar'");
        console.log(foo)
        // eval("var bar = 'bar'");
        // console.log(bar);
    }
)()
console.log(a);
// 使用别名执行eval，其内部作用域为全局作用域
function f6() {
    var a = 2;
    var e = eval;
    e('console.log(a)');
}
f6();
// 只要不是直接调用，都属于别名调用，引擎只能分辨eval()是直接调用
eval.call(null, '')
window.eval()
// rest参数，搭配的是一个数组
function add(...args) {
    let sum = 0;
    args.forEach(v => sum += v);
    return sum;
}
// 箭头函数
// 1. 没有自己的this
// 2. 不可以当作构造函数
// 3. 不可以使用arguments
// 4. 不可以当作generator函数