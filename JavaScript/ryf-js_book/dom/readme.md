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

# ChildNode接口
- remove() 从父节点移除该节点
- before() 在当前节点的前面插入节点（可多个，也可以是文本）
- after() 在当前节点的后面插入节点（可多个，也可以是文本）
- replaceWith() 替换当前节点（可以是元素也可以是文本）

# document节点
- 该对象代表整个文档
- 获取方法
  - 正常的网页 document 或 window.document
  - iframe框架 iframe节点的contentDocument
  - ajax返回的网页 使用XMLHttpRequest对象的responseXML属性
  - 内部节点的ownerDocument
- defaultView 属于window对象返回window对象，否则返回null
- doctype <DOCTYPE>节点
- documentElement <html>节点
- body <body>节点
- head <head>节点
- scrollingElement 当文档元素在滚动，返回那个元素在滚动，不存在则返回null
- links 返回当前文档所有设定了href属性<a>以及<area>节点
- forms 返回所有<form>表单节点
- images 返回页面所有的<img>图片节点
- scripts 返回当前页面所有的<script>节点
- location 拿到该对象
- lastModified 表示当前文档最后修改的时间
- cookie  
- open 清楚文档所有内容，使其变得可写
- write writeln 写入内容
- close 关闭打开的文档
- querySelector querySelectorAll
- getElementsByTagName() getElementsByClassName() getElementsByName() getElementById()
- createElement() createTextNode() createAttribute() createComment() createDocumentFragment()
- createEvent() 生成一个事件对象 参数是事件类型如UIEvents MouseEvent MutationEvents HTMLEvents
- dispatchEvent() 触发事件
- adoptNode() 将某个节点及其子节点从原来文档中移除，归属到当前document对象（只是改变归属，并没有插入文档树中）
- importNode(node, deep) 拷贝某个节点及其子节点（可选），归属document对象
- createNodeIterator() 返回一个子节点遍历器
  - 参数一是要遍历的根节点
  - 参数二是要遍历的类型
    - NodeFilter.SHOW_ALL
    - NodeFilter.SHOW_ELEMENT
    - NodeFilter.SHOW_TEXT
    - NodeFilter.SHOW_COMMENT
  - 可调用nextNode() 或previousNode() 遍历

# Element节点
- 继承了Node接口
- id 可读写
- tagName 大写标签名
- hidden 元素是否可见
- attributes 类似数组的对象，成员是当前元素节点的所有属性
- className class属性，每个class用空格隔开
- classList 数组对象，每个class是对象的一个成员
  - add()
  - remove()
  - contains()
  - toggle()
  - toString()
- dateset 自定义data- 属性，用来添加数据
- clientHeight 元素高度+padding
- clientLeft 元素节点左边框的宽度 不包括左侧padding和margin
- scrollHeight 当前元素总高度，包括溢出部分和不可见部分，也包括padding部分，不包括border、margin、::after、::before高度
- scrollLeft 表示当前元素水平滚动条向右侧滚动的像素量
- offsetParent 返回最靠近当前元素且CSS中position不为static的元素
- offsetHeight 元素高度+padding+border+水平滚动条高度
- offsetLeft 返回当前元素左上角相对于offsetParent节点的水平位移
- getBoundingClientRect() 返回一个对象，存储了当前元素节点的大小、位置等信息
- getClientRects() 类数组对象，返回对象有多少个成员取决于该元素在页面上占据多少行