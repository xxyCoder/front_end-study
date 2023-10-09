// 创建方式一   字面量创建
const obj1 = { name: "xxyCoder" }   // 不会调用Object构造函数
// 创建方式二   使用构造函数
const obj2 = new Object()
// 创建方式三   工厂模式
function ObjectFactory(name) {
    let res = {};
    res.name = name;
    res.say = function () {
        console.log(this.name)
    }
    return res;
}
// 创建方式四   构造函数模式
function ObjectContructor(name) {
    this.name = name;
    this.say = function () {
        console.log(this.name)
    }
}
// 创建方式五   原型模式
function ObjectPrototype(name) {
    this.name = name
}
ObjectPrototype.prototype.say = function () {
    console.log(this.name)
}

// 属性
const person = {}
// 使用该方法不指定值默认为false
Object.defineProperty(person, "name", {
    configurable: true,
    writable: true,
    enumerable: true,
    value: "xxyCoder"
});
Object.defineProperty(person, "age", {
    configurable: false,
    writable: true,
    enumerable: true,
    value: 17
});
delete person.age;  // 无效
// 非严格模式下也会抛出错误
// Object.defineProperty(person, "age", {
//     configurable: true
// })
Object.defineProperty(person, "sex", {
    configurable: true,
    writable: false,
    enumerable: true,
    value: "女"
})
person.sex = "男";  // 无效
Object.defineProperty(person, "addr", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: "China"
})


// 访问器属性
const book = {
    _year: 2023
}
Object.defineProperty(book, "year", {
    set(newValue) {
        if (newValue <= 2020) return;
        this._year = newValue;
    },
    get() {
        return this._year
    },
    enumerable: true
})
console.log("book:", book, Object.getOwnPropertyDescriptors(book))

// 定义多个属性
Object.defineProperties(person, {
    Phone: {
        value: 1887011111,
        configurable: true,
        writable: true
    },
    height: {
        get() {
            return 170;
        },
        configurable: true,
        enumerable: true
    }
})

console.log("person:", person, Object.getOwnPropertyDescriptors(person))  // 不展示addr属性

// 混入
const dest = {};
// 浅复制，不能获取getter函数和setter函数
Object.assign(dest, { name: "xxyCoder", age: 21, get x() { return 'x' } }, { name: "xxy", sex: "女", set x(newValue) { console.log("set x:", newValue) } }, { friends: { name: "xxx" }, say: function () { console.log("hello", this.name) } })
console.log("dest:", dest, dest.x, dest.say());

// 手写深拷贝
function deepClone(obj, map = new Map()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (/(Function|Regex|Date|Map|Set)/.test(obj.constructor.name)) {
        return new obj.constructor(obj);
    }
    if (map.has(obj)) {
        return map.get(obj);
    }
    const result = Array.isArray(obj) ? [] : {};
    map.set(obj, result);
    const keys = Reflect.ownKeys(obj);
    for (const key of keys) {
        result[key] = deepClone(obj[key], map);
    }
    return result;
}

// 对象解构
let obj3 = {
    name: "xxyCoder",
    firends: {
        name: "xxy"
    },
    age: undefined,
    sex: null,
    phone: undefined
}
// undefined则使用默认值
const { name, firends: { name: fname } } = obj3
let age = 21, sex = "女", phone;
({ age, sex, phone = "188" } = obj3)
console.log("解构:", name, fname, age, sex, phone)
// 原始属性解构，在内部调用ToObject()转换为对象，除了undefined和null不能解构
const { length } = "xxyCoder", { constructor: c } = 1
console.log("basic:", length, c);