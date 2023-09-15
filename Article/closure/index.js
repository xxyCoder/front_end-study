// 1 全局词法环境 global.LE = { t, fun }
let t = 111;
function fun() {
    // 3 fun.LE = { a, b, fun1 }
    let a = 1, b = 2;
    function fun1() {
        // 5 fun1.LE = { c }
        let c = 3;
    }
    // 4 fun.[[Scopes]] = [global.LE, func.LE]
}
// 2 fun.[[Scopes]] = [global.LE]
fun();

let a = 0, b = 0;
function A(a) {
    A = function (b) {
        console.log(a + b++);
    }
    console.log(a++);
}
A(1);
A(2);

// V8发生改变，不会直接将父级的LE直接放入其[[Scopes]]中，而是分析这个函数中使用了父函数LE中哪些变量，这写变量存储在closure中
// global.LE = {t, fun}
let tv = 111;
// fun.[[Scopes]] = [global.LE];
function funv() {
    // fun.LE = { a,b,c,fun1,obj },fun.Closure = {}
    let a = 1, b = 2, c = 3;
    // 遇到函数，解析函数会使用a，故fun.Closure = { a }
    function fun1() {
        console.log(a)
        // fun1.[[Scopes]] = [global.LE,func.Closure]
    }
    fun1();
    let obj = {
        // 遇到函数，解析会使用到b，故fun.Closure = { a, b }
        method() {
            console.log(b);
            // method.[[Scope]] = [global.LE,func.Closure]
        }
    }
}