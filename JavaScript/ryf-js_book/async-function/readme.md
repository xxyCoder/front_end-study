# async
- 是generator的语法糖
- await 后面可以跟着 Promise对象和原始类型值（自动转换为resolve的Promise对象）
- 返回值是Promise对象
  - 如果await中抛出错误或是reject并且都没捕获了，那么async函数则会将该情况的值用Promise.reject包裹
  - 如果没有以上情况，那么async函数则将返回的值用Promise.resolve包裹

# 使用形式
- 函数声明
- 函数表达式
- 类方法
- 箭头函数

# 实现原理
- 将generator函数以及自动执行器包裹在一个函数中

# 顶层await
- 在模块的顶层独立使用await，主要是解决模块异步加载问题
- 只能在ES6模块