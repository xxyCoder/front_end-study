# 枚举
- 成员的值可以是任意类型包括计算值，但不能是大整数类型
- 如果只设定第一个成员的值，后面的成员的值会从这个值开始递增
  - 如果第一个值不是数字，那么后面的值需要初始化
- 只读的，不能重新赋值
- 同名enum合并
  - 合并的时候只允许其中一个的首成员忽略初始值
  - 合并也不能有同名成员
  - 合并的必须都是同类（即非const类和const类）