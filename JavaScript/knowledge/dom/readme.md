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