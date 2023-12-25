# 浏览器环境

## 加载脚本
- 除了script引入脚本，还可以通过url(javascript:)协议，即在url的位置写入代码，如果写入的是字符，浏览器会创建新文档展示该字符且丢失原文档内容

## script
- 浏览器一边下载html网页一边开始解析，解析过程中发现script元素就暂停解析，将网页控制权给js引擎，如果该脚本引入外部脚本就需要先下载（也会阻塞html解析）后解析，当js引擎执行完毕将控制权交还给渲染引擎，继续解析html
  - 多个script元素会并行下载，但是会按照书写顺序执行，并行下载有一定数量限制，为了避免过度竞争、防止网络阻塞、减轻服务器压力
  - script没有同源限制，有时候需要其加载第三方脚本，但是可以通过CSP限定加载脚本的来源；也可以给script脚本指定integryty指定脚本的hash内容防止篡改
  - script到defer属性可以延迟脚本执行到dom加载生成后，下载的时候不会阻塞html解析
  - async属性则是下载时不会阻塞渲染，但是无法保证script的执行顺序
  - 动态生成的script然后插入页面，好处是不会阻塞页面渲染，但是无法保证执行顺序（可以设置async=false去避免该问题且不会阻塞html渲染）
- script元素放底部的好处是不会阻塞页面渲染html，且可以在dom结构生成之后调用dom节点不会导致报错（也可以使用DOMContentLoaded事件的回调函数）

## 浏览器组成
- 渲染引擎和js引擎
  - 渲染引擎负责解析html代码为dom，css代码为cssom，合成渲染树，布局和绘制，以上并非严格按顺序执行
  - 现代js引擎处理代码采用“即时编译”，即字节码（先读取代码进行词法分析->进行语法分析->将代码转换为字节码->字节码转换为机器码，字节码不能是不能直接执行的，运行在一个虚拟机上，虚拟机也称之为js引擎）只在运行时编译，用到哪一行编译哪一行，并将编译结果缓存

## window
- 指当前浏览器窗口，也是页面的顶层对象
- 属性
  - opener表示打开当前窗口的父窗口，如果从地址栏输入打开则为null，拿到opener有同源限制，也可以对a标签添加属性rel="noopener"防止新窗口拿到父窗口
  - frames是window的别名，其成员是页面内所有框架窗口，如果iframe设置了id或name，则可以通过id或name引用，iframe的window通过iframe的contentWindow拿到
  - top指向最顶层窗口,parent指向父窗口
  - devicePixelRatio表示一个css像素由多少个物理像素组成
  - innerHeight/innerWidth返回当前窗口可见部分的高度和宽度
  - scrollX/scrollY返回水平和垂直滚动距离
  - isSecureContext表示是否是https协议
- 方法
  - open()打开新窗口
  - close()关闭当前窗口
  - stop()停止加载图片、视频等或在等待加载的对象
  - scrollTo()将文档滚动到指定位置
  - print()跳出打印框
  - getSelection()返回一个Selection对象，表示用户现在选中的文本
  - getComputedStyle()接受一个元素作为参数，返回其样式表最终信息
  - requestAnimationFrame()将执行函数推迟到下一次重流时执行
    - 将requestAnimationFrame返回值给cancleAnimationFram()来取消回调函数执行
  - requestIdleCallback()将函数推迟到系统资源空闲时执行，或者给定属性超过时间限制执行
    - 将requestIdleCallback返回值给cancelIdleCallback()取消回调函数