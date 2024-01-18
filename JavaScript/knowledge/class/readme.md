# 类
- 类的所有方法都定义在类的原型上，且是不可枚举的，属性可以

## es6转es5
- 通过_classCallCheck去判断当前this是否是函数的实例
- 将属性挂载在this中，方法挂载在构造函数prototype中，静态属性挂载在构造函数中，且构造函数的prototype的writable为false
- 继承的父类在_inherits中实现
  - subClass.prototype = Object.create(superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      constructor: true
    }
  });
  这样做是为了避免修改subClass.prototype的时候影响到了superClass.prototype
 - 接着将subClass._proto__赋值为superClass，就可以拿到父类的静态方法和属性
- 无论是set还get或者是value形式，都是Object.defineProperty可以接受的参数
- 每一个私有属性都是一个weakMap，每一个私有方法都是一个weakSet，私有属性和方法并非挂载在原型或函数中，所以继承的对象拿不到父类的私有属性和方法。