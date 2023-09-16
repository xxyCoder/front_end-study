// 对象的所有键名都是字符串，所以加不加引号都可以
// 键值可以是任意类型
const obj = {
    foo: 'foo',
    'bar': 'bar',
    1: 1,
    1.2: 1.2,
    1e-2: 1e-2,
    0xff: true,
    f: function () { console.log('func') }
}
// 属性可以动态添加
obj.inObj = {}
// 表达式还是语句？
{ foo: 123 }
{ console.log(123) }
// JS无法确定是对象还是代码块，一律解释为代码块，解释为对象需要加圆括号
({ foo: 123 })
// 获取属性
console.log(Object.keys(obj))   // 遍历自身和继承的可枚举属性
console.log(Reflect.ownKeys(obj))   // 遍历自身（不含继承）所有键名（无论是否可以枚举）
console.log(Object.getOwnPropertyNames(obj), Object.getOwnPropertySymbols(obj))
// 删除属性，删除成功返回true
console.log(delete obj[1])
// 删除不存在的属性，返回也是true
console.log(delete obj['xxy'])
// 删除返回false的情况，那就是该属性存在，且不得删除
Object.defineProperty(obj, 'bar', {
    configurable: false
});
console.log(delete obj.bar)
// delete 只能删除对象属性本身，无法删除继承的属性，返回仍然是true
console.log(delete obj.toString)
console.log(obj.toString)
// in 检查对象某个属性是否存在，无论是继承还是自身携带
console.log(1.2 in obj)
// hasOwnProperty 判断是否为自身属性
console.log(obj.hasOwnProperty(1.2))
// for...in 遍历对象可遍历的属性，包括继承属性，跳过不可遍历属性
obj.__proto__.name = 'xxyCoder';
obj[Symbol()] = 'symbol';
for (let k in obj) {
    console.log(k)
}
// with语句 其内部操作必须是对象已经存在的属性，否则会创建一个当前作用域下的全局变量
with (obj) {
    // '1' = 111;
    foo = 'FOO';
    newValue = 'hello'
}
console.log(obj.foo, newValue)
// super关键字，指向当前对象的原型，只能在对象方法中使用
const proto = {
    x: 'hello',
    foo() {
        console.log(this.x)
    }
}
const objj = {
    x: 'world',
    foo() {
        super.foo() // Object.getPropertyOf(this).foo.call(this)
        this.__proto__.foo();
        this.__proto__.foo.call(this)
    }
}
Object.setPrototypeOf(objj, proto)
objj.foo()
// 解构不复制继承对象的原型属性
// 解构赋值,左边是对象,如果是undefine或null则报错
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4, z: 5 }
console.log(z)
// 扩展运算符 如果扩展运算符后面不是对象,则自动转换为对象
let foo = { ...['a', 'b', 'c'], ...1, ...'hello' }  // ...Object(1) === ...{} 由于该对象没有自身属性
console.log(foo)
// 扩展运算符的参数之中有get 也会执行
let a = {
    get x() {
        console.log('a get x');
        return 1
    }
}
console.log({ ...a })