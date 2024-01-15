# 迭代器
- 创建一个指针对象，指向当前数据结构的起始位置，调用指针对象的next指向下一个成员，每次next方法都会返回一个对象表示当前成员信息，对象有两个属性，分别是value表示当前成员的值，done表示是否遍历结束
- es6规定，默认的iterator接口部署在数据结构的Symbol.iterator属性

## return和throw方法
- next是必须部署的，return和throw方法是可选的
- 遍历时调用break或触发错误触发return方法，return必须返回一个对象

## 使用场合
- 解构赋值
- 扩展运算符
- yield*
- for...of
- Array.from()
- Map()、Set()
- Promise.all()、Promise.race()

## 与其他遍历方法对比
- for...in不仅仅遍历键名还包括原型上的键，且以任意顺序遍历
- forEach不能使用continue、break和return

# Generator
- 调用generator函数之后，该函数并不执行而是返回一个遍历器对象，调用其next方法让指针指向下一个状态
- 调用next后遇到yeild或return停止，返回对象value为yield或return 后跟着的值，如果是return则done为true
  - yield后面的表达式只有执行到此的时候才会开始运算
  - yield如果跟着表达式之后需要用圆括号包裹自身
  - next可以接受一个参数，作为上一次yield的返回值，可以用来调整函数的行为
- 函数内部也可以没有yield，这样函数就变成暂缓执行函数，即第一次调用不执行
- 不能跟着new一块使用

## 原型方法
- throw()用于在函数体外面抛出错误，在generator里面捕获
- return()方法不提供参数，提前终止遍历，如果generator内部有try...finally且正好执行try中的yield，就先执行完finally的剩余代码，执行完后结束

## yield*表达式
- 用来在一个generator函数中执行另一个generator函数
- 后面也可以跟着一个遍历器对象

## generator的this
- 默认执行全局对象，可以使用call方法改变其this指向且不影响调用next方法