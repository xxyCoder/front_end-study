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

// 手写new
function myNew(Constructor, ...args) {
    const thisValue = Object.create(Constructor.prototype);
    const result = Constructor.apply(thisValue, args);
    return typeof result === 'object' && result !== null ? result : thisValue;
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


function SuperType(name) {
    this.property = true;
    this.name = name;
    this.color = ["red", "blue", "green"];
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}

// 原型链继承
function SubType1() {
    this.subProperty = false;
}
SubType1.prototype = new SuperType("xxyCoder");
SubType1.prototype.constructor = SubType1;
SubType1.prototype.getSubValue = function () {
    return this.subProperty;
}

// 盗用构造函数
function SubType2(name) {
    // 继承
    SuperType.call(this, name);
}

// 组合继承
function SubType3(name) {
    SuperType.call(this, name);
}
SubType3.prototype = new SuperType();
SubType3.prototype.constructor = SubType3;

// 寄生式组合继承
function SubType4(name) {
    SuperType.call(this, name);
}
SubType4.prototype = Object(SuperType.prototype)    // 将父类原型对象的副本给子类原型对象
SubType4.prototype.constructor = SubType4;

// 手写instanceof方法
function myInstanceOf(obj, classFunction) {
    if (obj === null || typeof obj === 'undefined' || classFunction === null || typeof classFunction === 'undefined') {
        return false;
    }
    // 不使用obj作为判断，可能obj是假类型无法进入while
    while (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj) !== classFunction.prototype) {
        console.log(obj.__proto__)
        obj = Object.getPrototypeOf(obj);
    }
    return Object.getPrototypeOf(obj) === classFunction.prototype
}

// 类
{
    class Person {
        static type = "Person";
        constructor(name) {
            this._name = name;
        }
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
        static getType() {
            console.log("class:", this)
            return this.type;
        }
    }
    const Animal = class { };
    function exists() {
        console.log("YES", typeof Animal)
    }

    const p = new Person("xxyCoder");
    console.log(Person.getType())

    // 类继承
    class xxy extends Person {
        constructor(name) {
            super(name);
        }
        static getType() {
            console.log("xxy");
            return super.getType()
        }
    }
    const dog = class extends Animal { }

    const x = new xxy("xxyCoder");
    console.log(xxy.getType())
}
exists();