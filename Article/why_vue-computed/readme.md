# 计算属性是如何在vue中实现的
- dep 依赖收集的地方
- effect 重新计算函数
- _value 缓存值
- _dirty 标记当前值是否需要重新计算
- __v_isReadonly 标记是否可写 