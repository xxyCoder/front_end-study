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