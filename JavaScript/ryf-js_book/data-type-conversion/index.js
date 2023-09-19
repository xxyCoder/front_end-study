// 字符串
console.log(Number('123'))
// Number() 比较严格，只要有一个字符无法转换成数值，便返回NaN
console.log(Number('123abc'), 'Number')
// parseInt从头解析，遇到不能解析则返回已经解析完成的
console.log(parseInt('123abc'), 'ParseInt')
// Number() parseInt() 会跳过前导和后缀空格
console.log(Number('  ') === Number(''), Number(''), Number('\t\n\r123\v '))
console.log(parseInt('\t\n\r123\v '), parseInt(''))
// undefined null
console.log(Number(undefined), parseInt(undefined))
console.log(Number(null), parseInt(null))
// bigint
console.log(Number(1n), parseInt(1n))
// 小数点
console.log(Number('3.14'), parseInt('3.14'))
// 对象
console.log(Number({ a: 1 }), Number([1, 2, 3]), Number([1]))
console.log(parseInt({ a: 1 }), parseInt([1, 2, 3]), parseInt([1]))
console.log(Number({}), parseInt({}))
// Number转换对象，第一步调用valueOf方法，没有返回原始值则调用toString方法，对返回值使用Number，如果返回值是对象则报错
const obj1 = {
    x: 1,
    valueOf() {
        console.log("valueOf")
        return {
            x: 1
        }
    },
    toString() {
        console.log("toString");
        // return {
        //     x: 1
        // }
        return this.x;
    }
}
console.log(Number(obj1))
const obj2 = {
    x: 1,
    toString() {
        console.log("ToString");
        return {
            x: 1
        }
    },
    valueOf() {
        console.log("ValueOf");
        return this.x
    }
}
console.log(parseInt(obj2))

// 原始数据类型，字符串返回相同，其余加上双引号
console.log(String(123), String(null), String(undefined), String('abc'))
// 对象
console.log(String({ a: 1 }))
console.log(String([1, 2, 3]), String([1]))
// 与Number相同，但是valueOf和toString方法调换执行顺序
console.log(String(obj2))

// undefined null 0 NaN '' 返回都是false
console.log(Boolean(undefined), Boolean(''), Boolean(0), Boolean(NaN), Boolean(''))
// 对象
console.log(Boolean({}), Boolean([]), Boolean(new Boolean(false)))