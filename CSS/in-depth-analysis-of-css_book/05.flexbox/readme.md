# 弹性容器
- 弹性容器像块元素一样填满可用宽度，不一定填满，但是子元素高度相同
- flex：flex-grow flex-shrink flex-basis 的简写
- flex-basis 定义了元素大小的基准值，即初始的“主尺寸”
  - 初始值是auto，会检查是否设置了width属性，如果有则使用width作为flex-basis的值，如果没有则是元素内容自身的大小
- flex-grow 非负整数，其值越大，元素“权重越高”，占据剩余宽度越大
- flex-shrink 计算出弹性子元素的初始主尺寸后，它们的累加值可能会超过弹性容器的可用宽度，如果不用flex-shrink则会导致溢出；该值含义表示其是否应该收缩防止溢出；其中为0表示不收缩，大于0则表示收缩至不再溢出
- flex-flow: flex-direction flex-wrap 的简写