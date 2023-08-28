# 盒模型
- box-sizing调整盒模型行为
  - content-box，默认值，宽高只设定为内容盒子的大小
  - border-box，宽高设置为内容、内边距、边框的大小
- 不会被继承

# 等高列问题
- 使用CSS表格代替浮动布局
  - 容器display: table
  - 每一列设置为display: table-cell
- flexbox
  - 子元素默认等高

# 垂直居中问题
- vertical-align不生效问题提
  - 该声明只影响行内元素或table-cell元素
- 使用上下等内边距
- flex布局

# 多个外边距折叠问题
- 即使两个元素不是相邻的兄弟节点也会产生外边距折叠
- 容器变为BFC
- 两个外边距之间加边框或内边距
- 使用flex布局，内部元素之间不会发生外边距折叠
- table-cell不具备外边距，不会折叠

# 猫头鹰选择器
- * + *
- 可以避免首位产生不必要的margin
```css
* + * {
  margin-top: 5px
}
```