# 盒模型
- box-sizing调整盒模型行为
  - content-box，默认值，宽高只设定为内容盒子的大小
  - border-box，宽高设置为内容、内边距、边框的大小
- 不会被继承

# 等高列问题
- 使用CSS表格代替浮动布局
  - 容器display: table
  - 每一列设置为display: table-cell