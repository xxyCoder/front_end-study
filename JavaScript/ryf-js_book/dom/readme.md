# 节点
- Document 整个文档树的顶层节点
- DocumentType doctype标签
- Element 网页各种HTML标签
- Attr 网页元素的属性
- Text 标签之间或标签包含的文本
- Comment 注释
- DocumentFragment 文档的片段
- 以上节点都继承了Node，有共同的属性和方法

# 节点树
- parentNode 父节点
- childNodes 子节点
  - firstChild 第一个子节点
  - lastChild 最后一个子节点
- sibling 相邻节点
  - nextSibling 下一个相邻节点
  - previousSibling 上一个相邻节点

# Node接口
- nodeType 整数值，表示节点类型
- nodeName，节点的名称
  - 文档节点 #document
  - 元素节点 大写的标签名
  - 属性节点 属性的名称
  - 文本节点 #text
  - 文档片段节点 #document-fragment
  - 文档类型节点 文档的类型
  - 注释节点 #comment
- nodeValue，文本值，可读写
  - 文本节点、注释节点、属性节点有文本值
- textContent，返回当前节点和其后代节点的文本值
- baseUrl 当前网页的绝对路径 只读
- ownerDocument document对象
- parentNode
  - 类型可能是元素节点、文档节点、文档片段节点
- parentElement 当前节点的父元素节点
- childNodes 当前节点的所有子节点
- isConnected 布尔值，表示当前节点是否在文档之中
- appendChild() 接受一个节点对象作为参数，将其插入到最后一个子节点末尾
  - 如何插入的是DocumentFragment节点，那么插入的其所有子节点
- hasChildNodes() 表示当前节点是否有子节点
- cloneNode() 克隆一个节点，接受布尔值表示是否深度克隆
  - 克隆一个节点会拷贝其所有属性，但是会丧失addEventListener方法和on-方法
- insertBefore() 将某个节点插入父节点内部指定的位置
- removeChild() 从当前节点移除该子节点
- replaceChild(newChild, oldChild) 用一个新节点替换旧节点
- contains()
  - 参数节点为当前节点
  - 参数节点为当前节点的子节点
  - 参数节点为当前节点的后代节点
- compareDocumentPosition() 比较两个节点的位置并返回一个十六进制的数
- isEqualNode() 判断两个节点是否相等（类型、属性、子节点）

# NodeList接口
- 成员是节点对象
  - 通过childNodes获取
  - 通过querySelectorAll()等节点搜索方法
- 有forEach方法

# HTMLCollection接口
- 节点对象的集合，只能包含元素节点
- 没有forEach方法

# ParentNode接口
- 只有元素节点、文档节点、文档片段节点有该接口
- children 所有元素节点
- childElementCount 所有元素子节点的数目