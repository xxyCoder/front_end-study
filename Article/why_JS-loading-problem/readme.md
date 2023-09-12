# JS加载问题
## 关键路径渲染
1. 构建文档对象模型(DOM)
   - 首先读取HTML原始字节，然后对读取后结果词法分析，接下来对其语法分析，最后构建DomTree
2. 构造CSS对象模型(CSSDOM)
   - HTML parse遇到link标签的stylesheet并不会等待其下载完后才解析后续DOM
   - 下载完成之后，Css parse是在主线程进行，这意味着会抢占HTML Parse主线程资源，所以这两者不会同时进行
3. 生成渲染树
   - 从DomTree开始遍历，遍历每一个可见节点（会省略一些脚本、元标签等不可见以及CSS设置了display:none属性），在CssDom中找到合适匹配规则并应用
   - 最终在Render Tree上挂着这些带有内容以及样式可见的点
4. 布局
   - 计算每个节点在对应设备上屏幕的确切位置和大小，所有相对测量值都转换为屏幕上的绝对值
5. 绘制
   - 将每个节点转换为屏幕上实际的像素

## JS会不会阻塞？
- JS引擎线程负责JS代码的解析和执行
- 当HTML下载时，parse HTML的过程遇到JS脚本是会停止后续DOM的解析

### 内联JS
- 解析到script的时候，构建DomTree的渲染线程被JS占有，从而阻塞页面的渲染
- 将内联脚本放在底部，脚本可以拿到内存已经构建好的DOM节点进行操作

### 外联JS
- 解析HTML文档的时候会有预解析，这一过程会分析HTML中外部资源链接从而不需要在进行HTML parse的时候发现外部资源
- 外部脚本加载和执行只会影响后续DOM的解析和渲染
- defer 关键字，文档解析完成后立即触发一次渲染之后依次执行标记为defer的脚本
- async 关键字，其执行时机不确定

## CSS？
- 对于CSS文件的解析，如果没有解析完成，会阻塞页面的渲染
- 将link标签放在底部
  - 首先会绘制一次无样式DOM，等待link标签加载完成并且解析完成会生成Render Tree进行绘制（重绘过程）