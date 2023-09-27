class Person {
    foo = "foo";

    static bar = "bar"

    constructor(name) {
        this._name = name
    }

    sayHello() {
        return 'hello, I am ' + this.name;
    }

    static onlySayHello() {
        return 'hello'
    }

    get name() {
        return this._name
    }

    set name(newName) {
        this._name = newName;
    }
}
// class转译成ES5 function
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; ++i) {
            var descriptor = props[i];
            // 类的方法和属性默认不可枚举
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps)
        if (staticProps) defineProperties(Constructor, staticProps)
    }
}();

// 检查Person是否通过new调用而不是函数形式调用，函数形式调用则this是window
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function () {

    function Person(name) {
        _classCallCheck(this, Person);

        this.foo = "foo"
        this._name = name;
    }

    _createClass(Person, [
        {
            "key": "sayHello",
            value: function sayHello() {
                return 'hello, I am ' + this.name;
            }
        },
        {
            "key": "name",
            get: function get() {
                return this._name;
            },
            set: function set(newName) {
                this._name = newName;
            }
        }
    ], [
        {
            key: "onlySayHello",
            value: function onlySayHello() {
                return "hello";
            }
        }
    ]);
    return Person;
}();
Person.bar = "bar";