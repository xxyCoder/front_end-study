# 原型
- 所有的引用类型都有__proto__属性（对象、数组、函数），都指向各自的原型对象
- 只有函数才有prototype属性
- 原型对象有constructor属性，指向其构造函数
- 函数的.__proto__ 指向Function.prototype

# 原型链顶层
- 引用类型.prototype 也是对象，由Object构造函数创建，也有__proto__指针
- Object.prototype 也是对象，也有__proto__指针，但是指向null
