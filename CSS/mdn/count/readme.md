# 计数器
- counter-reset 属性初始化计数器的值
- counter-increment 属性指定其值为递减或递增
- counter() counters() 在content中显示计数器的值
  - 当不需要包含父级上下文编号，而仅仅需要嵌套内容的编号时，使用count
  - 当需要包含父级上下文编号，使用counts
- 反向计数器 counter-increment: reversed()  通过counter-increment递减