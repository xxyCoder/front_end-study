# 引用类型

## 对象
- 比较适合存储和应用程序间交换数据

### 创建对象模式
- 工厂模式，没有解决对象标识（即对象是什么类型），且不同对象相同的方法占据内存不同位置
- 构造函数模式，使用new调用，解决了对象标识问题，但是且不同对象相同的方法占据内存不同位置（可将函数方法移到外部，再赋值给对象，但是这样导致代码不能很好的聚集一起）
- 原型模式，解决了不同对象相同的方法占据内存不同位置问题，但是共享的属性没有自己的属性副本

## 原型
- 创建一个函数就会为这个函数按照规则创建一个prototype，所有原型对象都自动获取constructor属性，指向与之关联的构造函数
- 每次调用构造函数，该实例就会有__proto__指针指向构造函数的原型对象
- 正常原型链都会终止于Object的原型对象，Object的原型的原型是null
- isPropertyOf()确定两个对象之间的关系
- getPropertyOf()返回参数的内部__proto__
- setPropertyOf()将__proto__写入新值
  - 重写原型对象，会导致之前创建出的实例丢失对新原型对象的引用

### 对象属性
- 使用Object.defineProperty()或Object.defineProperties()
- 非标准访问器属性__defineGetter__()和__defineSetter__()
- 分为两种
  - 数据属性，违反下列规定非严格模式下操作无效，严格模式下抛出错误
    - Configurable  表示属性是否可以删除、重新修改配置，默认为true
    - Enumerable    是否可以通过for in循环遍历得到，默认为true
    - Writeable 是否可以被修改，默认为true
    - Value 属性实际的值，默认为undefined
  - 访问器属性
    - Configurable
    - Enumerable
    - Get 默认为undefined 不定义表示不可读
    - Set 默认为undefined 不定义表示不可写

### 对象混入
- Object.assign() 接收一个目标对象和多个源对象，将源对象中可枚举的属性（enumerable和hasOwnProperty属性为true）浅复制到目标对象，如果赋值期间出错误，则操作会中止但不会回滚

### 对象判等
- Object.is() 和===相似，但是+0和-0表示不相等，NaN和NaN相等

### 获取对象键值对
- in 如果该属性是否存在
- getOwnProperty()  确定属性是否在实例而非原型
- Object.keys() 返回可枚举属性名称的字符串，顺序不确定
- getOwnPropertyNames() 列出所有实例属性，无论是否可枚举，顺序按照升序枚举数值键、插入顺序枚举字符串和符号键
- getOwnPropertySymbols() 列出所有symbols属性，顺序按照升序枚举数值键、插入顺序枚举字符串和符号键

## 继承
- 通过原型链继承多个引用类型的属性和方法，存在引用值问题
- 盗用构造函数，解决上述问题，但是函数无法重用，且子类无法访问父类原型定义的方法
- 组合继承，即组合原型和构造函数，存在父类构造函数调用两次问题
- 寄生式组合继承