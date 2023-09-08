# EventTarget接口
- addEventListener() 绑定事件的监听函数
- removeEventListener() 移除事件的监听函数
  - 函数必须是同一个函数，不能是相同函数内容，第三个参数也必须相同
- dispatchEvent() 触发事件
  - 接受一个event事件
  - 返回值可以判断事件是否被取消了

# 事件模型
- HTML中有on- 属性，定义监听事件的代码，属性的值是将会执行的代码而不是函数名，在冒泡阶段触发
- 监听函数内部的this指向触发事件的那个元素节点
  - addEventListener 与 element.onxxx 也是

# Event对象
- 事件发生以后，会产生一个事件对象，作为参数传递给监听函数
- Event本身是构造函数
  - type参数，表示事件名称
  - options对象，表示事件对象的配置
    - bubbles，表示是否可以冒泡，默认false
    - cancelable，表示是否可以被取消，默认为false
- bubbles 表示是否是冒泡
- eventPhase 属性返回一个整数常量，表示事件所处的阶段，只读
- currentTarget 和 target
  - currentTarget 属性返回当前所在的节点，即事件当前正在通过的节点，也就是当前执行监听函数的节点
  - target 属性返回原始触发事件的那个节点
- isTrusted 返回一个布尔值，表示该事件是否由真实的用户行为产生
- preventDefault() 阻止默认行为
- stopPropagation() 阻止传播
- stopImmediatePropagation() 阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点，比stopPropagation阻止的更彻底
- composePath() 返回一个数组，成员是事件的最底层节点和依次冒泡经过上方的所有节点