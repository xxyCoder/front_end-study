# 对象转换为数字
- Symbol.toPrimitive，存在则调用，不能返回对象类型
- 没有就调用valueOf，如果返回对象类型就调用toString
- 最后调用toString，如果返回对象则报错

# 执行栈与堆内存
- 浏览器打开页面，会从虚拟内存中分配两块内存供其使用
- 栈内存
  - 供代码执行
  - 存储变量和原始类型的值
- 堆内存
  - 存储对象类型的值
  - 默认会在堆内存开辟16进制地址GO（global object）全局对象，存储了浏览器为JS提供的内置API
- 创建一个全局的执行上下文EC
  - 供全局代码执行的环境
  - 进栈执行
- 代码执行过程中，可能会声明变量，所以需要一个存放变量的地方即变量对象VO/AO，该对象放在自己的上下文中
  - 原始类型直接存储在栈中
  - 对象类型，需要在堆中开辟空间，栈中存储一个指针指向堆中对象
  - 在全局上下文中会创建window变量指向GO
- 函数执行过程中
  - 创建全新的私有上下文
  - 代码执行前先初始化作用域链（EC<fn>,EC<G>）、THIS、ARGUMENTS、形参、变量提升

## let和var区别
- 在全局上下文中，var function声明的变量是存储在GO中的，let和const存储在VO中

# 块级上下文
- ES6新增，除函数和对象的大括号都是块级上下文的大括号
- 如果判断体中出现了function，无论条件是否成立，都只是先声明不定义
- 判断体中出现function会产生私有上下文