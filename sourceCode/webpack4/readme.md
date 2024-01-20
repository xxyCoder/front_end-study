# rulsSet处理规则
1. 调用normalizeRules处理module.rules
2. 对于数组形式的rules则循环调用normalizeRule处理每一项
3. 如果一个rule是字符串形式，则包裹成use: [{ loader: rule }]，不是字符串那么必须是非null对象，挨个调用normalizeConditionq去处理(test、include、exclude统一处理)、resourceQuery、resource等，对于loaders则调用normalizeUse处理
4. normalizeCondition就是返回一个函数以传入的condition作为条件判断是否符合限制
5. normalizeUse循环调用normalizeUseItem处理每一项loader，对于loader是字符串则处理返回{ loader: '', options: '' // loader?的问号紧跟着的 }，不是字符串则返回原本对象，但是该原本对象的options和query做了选择。