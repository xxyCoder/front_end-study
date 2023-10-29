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
  
# 鼠标事件
- MouseEvent接口继承了Event
- button
  - 0 表示按下鼠标左键
  - 1 表示按下鼠标滚轮
  - 2 表示按下鼠标右键
- buttons 表示同时按下那些键钮
  - 1 按下左键
  - 2 按下滚轮
  - 4 按下右键
- movementX movementY 返回当前位置与上一个mousemove事件之间的距离
- clientX 返回鼠标相对于浏览器位置
- screenX 返回鼠标相对于屏幕位置
- offsetX 返回鼠标相对于目标节点左侧padding边缘水平距离
- pageX 返回鼠标相对于文档左侧边缘距离

# 表单事件
- input事件，当input、select、textarea的值发送变化触发，对于复选框或单选框改变选项时，也会触发
- change事件，不同于input事件在值变化立即触发，而是失去焦点触发
- invalid事件，如果提交表单的时候，如果不满足校验触发事件
- reset事件，当表单重置触发
- submit事件，当表单向服务器提交时触发

# 拖拉事件
- 拖拉是用户在某个对象按下鼠标不放，拖到另一个位置然后释放鼠标键，将对象放在哪里
- draggable属性设为true表示该属性可拖拉，但是img和a不需要设置也可以拖拉
- drag，在拖拉过程中，被拖拉节点触发触发
- dragstart，用户开始拖拉时，被拖拉的节点触发
- dragend，拖拉结束，被拖拉节点触发
- dragenter，拖拉进入节点时触发
- dragover，拖拉到当前节点上方时候，在当前节点持续触发
- dragleave，拖拉节点离开当前节点触发
- drop，被拖拉的节点释放到当前节点触发
- 每个拖拉实例都有DragEvent.dataTransfer属性，用来读写需要传递的属性
  - files包含一组拖拉的文件
  - types只读数组，里面是拖拉数据的格式
  - items类数组对象，每个成员都是本次拖拉的一个对象
    - add(data,type)增加一个指定内容和类型
    - add(file)增加一个文件
    - remove(index)移除指定位置的成员
    - clear()清空所有