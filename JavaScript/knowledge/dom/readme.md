# DOM
- 文档对象模型，其作用是将网页转为一个js对象，从而用脚本进行各种操作

## 节点
- dom tree就是由不同类型节点组成，有七种类型
- Document 整个文档树的顶层节点
- DocumentType doctype标签
- Element 网页的各种html标签
- Attr 网页的各种属性
- Text 标签之间的文本
- Comment 注释
- DocumentFragment 文档的片段

## 节点树
- 文档的第一层有两个节点，第一个是文档类型节点（<!doctype html>），第二个是<html>，后者构成了树节点的根节点

## 属性
- nodeType返回一个整数值表示节点类型
  - Node.DOCUMENT_NODE 文档节点
  - Node.ELEMENT_NODE 元素节点
  - Node.ATTRIBUTE_NODE 属性节点
  - Node.TEXT_NODE 文本节点
  - Node.DOCUMENT_FRAGMENT_NODE 文档片段节点
  - Node.DOCUMENT_TYPE_NODE 文档类型节点
  - Node.COMMENT_NODE 注释节点
- nodeName返回属性节点的名称
  - 文档节点：#document
  - 元素节点：大写的标签名
  - 属性节点：属性名称
  - 文本节点：#text
  - 文档片段节点：#document-fragment
  - 文档类型节点：文档的类型（如 html）
  - 注释节点：#comment
- nodeValue返回一个字符串表示节点本身的文本值，只有文本节点、注释节点和属性节点有文本值，其余都为null
- textContent返回当前节点和它所有后代节点文本内容，自动忽视内部的html标签；可读写，一旦设置该属性的值就会用一个新的文本节点替换原来的子节点，会对html标签转义
- nextSibling返回紧跟当前节点后面的同级节点（包含文本节点和注释节点）
- previousSibling返回当前节点节点的距离最近的同级节点（包含文本节点和注释节点）
- parentNode返回当前节点的父节点（元素节点、文档节点和文档片段节点）
- parentElement返回当前节点父节点（元素节点）
- firstChild返回当前节点的第一个子节点（包含文本节点、注释节点和元素节点）
- lastChild同上，区别是当前节点的最后一个子节点
- childNodes返回一个类数组对象（NodeList集合），成员包含当前节点的子节点
- isConnected表示当前节点是否在文档之中

## 方法
- appendChild()接受一个节点对象参数，作为最后一个子节点插入当前节点
- cloneNode()克隆一个节点，接受boolean参数表示是否深度克隆，返回一个新的克隆节点
  - 但是会丧失其监听函数和回调函数
- insertBefore(newNode, referenceNode)插入当前节点某个子节点前方，没有referenceNode就等同于appendChild()方法
- removeChild(node)移除父节点的某个子节点
- replaceChild(newChild, oldChild)替换当前节点的某一个子节点
- contains(node)返回布尔值表示当前节点参数是否满足以下条件
  - 为当前节点
  - 为当前节点的子节点或后代节点
- isEqualNode() 用于检查两个节点是否相等（节点类型、属性、子节点相同）
- isSameNode() 用于检查两个节点是否为同一个节点
- normalize()将相邻文本节点合并成一个

## NodeList接口
- 一个类数组对象，成员是节点对象，以下方法可以获得该实例
- Node.childNodes
- document.querySelectorAll()
- forEach() keys() values() entries()

## HTMLCollection接口
- 只能包含元素节点，也是类数组对象，与NodeList不同在于只能使用for循环
- 如果元素节点有id或name属性，可以通过使用id或name属性引用该节点

## ParentNode接口
- 由于只有元素节点、文档节点、文档片段节点有子节点，因此这三类会继承该接口
- children属性，返回一个HTMLCollection实例
- firstElementChild返回第一个元素的子节点
- lastElementChild返回最后一个元素的子节点
- append()为当前节点最加一个或多个子节点在末尾（可以是元素节点也可以是文本节点）
  - append()允许字符串作为参数，appendChild()只允许子节点
  - append()可以有多个参数，appendChild()只能有一个
- prepend()同上，区别在于添加位置是第一个元素的子节点前面

## childNode接口
- 如果一个节点有父节点，那么该节点就有了childNode接口
- remove()用于从父节点移除当前节点
- before()用于在当前节点前插入一个或多个同级节点
- after()同上，区别在于当前节点后面
- replaceWith()替换当前节点

## Document节点
- 浏览器开始载入html文档，该对象就存在了
- 正常网页通过window.document获得
- iframe使用iframe.contentDocument获得

### 属性
- doctype 指向<!doctype >节点
- documentElement指向html节点
- body
- head
- fullscreenElement返回以全屏状态展示的dom元素
  - requestFullscreen() 全屏
  - exitFullscreen() 退出全屏
- links返回标签a以及area的集合
- forms返回form表单节点
- images返回所有img图片节点
- scripts返回所有scripts节点
- styleSheets返回网页内嵌或引入的css样式集合表
- domain返回当前文档的域
- lastModified返回文档最后修改时间
- referrer表示当前文档的访问者来自哪里
- readyState返回当前文档状态，状态每发生一次变化都会触发readystatechange事件
  - loading 加载html代码阶段
  - interactive 加载外部资源阶段（img、links等）
  - complete 加载完成
- designMode控制当前文档是否可编辑
  - on或off
- currentScript返回当前脚本所在的dom节点

### 方法
- open()清空当前文档所有内容，使得文档处于可写状态，供write()写入内容
- close()关闭打开的文档
- write()写入文档，对标签不转义
- elementsFromPoint(x,y) 返回位于页面指定坐标（相对视口）所有元素

## Element
- 继承了Node接口
- 属性
  - id
  - tagName，与nodeName相等
  - accessKey读写分配给当前元素的快捷键（按下快捷键可将焦点聚焦在该元素上）
  - draggable表示该元素是否可以拖动
  - tabIndex返回一个整数表示Tab键遍历时的顺序
  - title用来指导悬浮该元素的时候弹出的文字提示框
  - contentEditable使得元素内容可以编辑
  - attributes返回一个类数组对象，成员是当前元素的所有属性节点
  - className读写当前元素节点的class，值为字符串
  - classList属性返回一个类数组对象，每个class就是对象中的一个成员
    - remove()
    - add()
    - toggle()
    - contains()
  - dataset自定义的data-属性
  - innerHTML该节点的内容，对标签不会转义，且对于script标签的内容不会执行
  - outerHTML返回该节点本身以及所有子元素，如果一个节点没有父节点，设置该属性则报错
  - scrollHeight/scrollWidth 元素高度/宽度包括溢出内容（包括不可见部分）的高度/宽度，小数四舍五入
  - offsetParent返回最靠近当前元素且css的position不等于static的元素
  - offsetLeft/offsetTop返回当前元素相对于offsetParent节点的水平/垂直位移
  - style读写元素行内样式
  - firstElementChild/lastElementChild 第一个/最后一个元素子节点
  - nextElementSibling/previousElementSibling 下一个/前一个元素节点
- 方法
  - scrollIntoView()滚动到当前元素，即进入浏览器可视区域
  - getBoundingClientRect()返回一个对象提供当前元素大小、位置等信息
  - click() 模拟click点击

## Text节点
- 方法
  - appendDate() 在text节点尾部添加字符串
  - deleteDate(start, len) 删除text节点内部的字符串
  - insertDate(start, len) 插入
  - replaceDate(start, len, newStr)
  - subStringDate(start, len)获取子字符串

## Mutation Observer
- 监听dom变动，事件是异步触发，将变动记录封装成一个数组
- 方法
  - observe(dom, options)指定dom节点和监听的变动
    - childList 子节点变动
    - attributes 属性变动
    - characterData 节点内容变动
    - subtree 该节点的所有后代节点
    - attributeOldValue 属性变动是否记录旧值
    - characterDateOldValue 同上，区别是文本旧值
    - attributeFilter 数组，表示要观察的属性（即过滤器，不在数组内都过滤掉）
  - disconnect() 停止观察
  - takeRecords() 清除变动记录，即不再处理未处理的变动，并返回变动记录数组