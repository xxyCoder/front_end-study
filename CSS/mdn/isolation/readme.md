# isolation
- 定义该属性是否新建一个新的层叠上下文，用来隔离mix-blend-mode元素的混合
  - background-blend-mode, 背景混合模式。那这个CSS属性需要isolation:isolate进行阻隔吗？答案是不需要。background-blend-mode天生是一个封闭的混合领域，不会影响其他元素
- auto  表示该元素的属性需要的时候才会创建一个新的元素栈环境
- isolate   定义一个新的元素栈环境会被创建