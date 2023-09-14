# Set
- 接受一个数组（或具有iterator接口的其他数据结构）
- 成员的值唯一，不重复
- 加入Set的时候使用Same-value-zero quantity，类似与 === ，但是判断NaN的时候认为NaN == NaN
- add() 添加某个值
- delete() 删除某个值
- has() 返回一个布尔值
- clear()   清除所有成员
- Array.from()  可以将Set转换为数组
- keys() 返回键名遍历器
- values()  返回键值的遍历器
- entries() 返回键值对的遍历器
- forEach() 使用回调函数遍历每个成员

# WeakSet
- 其值只能是对象或Symbol值
- 对象都是弱引用，即垃圾回收机制不考虑WeakSet对象的引用，对象在外部消失，那么在WeakSet里面的引用就会自动消失
- 不能遍历，因为成员都是弱引用，随时都可能消失，很可能刚刚遍历结束，成员就取不到了
- add()
- delete()
- has()

# Map
- 也可以接受数组，数组的成员是一个个表示键值对的数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构
- 对于一个键多次赋值，后面的将覆盖前面的
- get()
- set()
- has()
- delete()

# WeakRef
- 用于直接创建弱引用
- defer() 如果原始对象存在，则返回原始对象；如果被清除了，则返回undefined

# FinalizationRegistry 
- 清理器注册表功能，用来指定目标对象被垃圾回收机制清除后，所要执行的回调函数