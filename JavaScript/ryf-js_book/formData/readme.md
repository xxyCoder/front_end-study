# FormData对象
- 其构造函数是一个DOM的表单元素，该参数可选，如果为空，表示一个空的表单
- 实例方法
  - get(key)    获取指定键名对应的键值，如果有多个，那么返回第一个获取的
  - getAll(key) 
  - set(key,value)  设置指定键的键值为新键值，如果没有该键则创立
  - delete(key) 删除一个键值对
  - append(key,value)   添加一个键值对
  - has(key)
  - values()    返回一个遍历器
  - entries()   返回一个遍历器

# 表单内置验证
- 如果一个控件通过验证，就会匹配:valid的CSS伪类，没有通过验证那么匹配:invalid伪类
- checkValidity()   手动触发表单的验证
- willValidate属性  表示是否在提交时候进行校验
- validationMessage属性 返回一个字符串，表示控制不满足校验条件时，浏览器显示提示文本