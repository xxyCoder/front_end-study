# 引用类型

## 对象
- 比较适合存储和应用程序间交换数据

### 创建对象模式
- 工厂模式，没有解决对象标识（即对象是什么类型），且不同对象相同的方法占据内存不同位置
- 构造函数模式，使用new调用，解决了对象标识问题，但是且不同对象相同的方法占据内存不同位置（可将函数方法移到外部，再赋值给对象，但是这样导致代码不能很好的聚集一起）

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