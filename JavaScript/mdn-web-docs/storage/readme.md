# sessionStorage
- 存储在sessionStorage中的数据会在页面会话结束时被清除（刷新不会）
- 新打开的标签页会复制父级的sessionStorage，类似于深拷贝，之后sessionStorage变更不同步
- 打开多个相同URL，会创建各自的sessionStorage
- setItem() 添加数据条目

# localStorage
- 数据可以长期保存
- getItem() 读取数据
- removeItem()  清除数据
- clear()   清除所有
- 键也占空间
- 键值对采用UTF-16字符编码
- 长度是5MB的UTF-16编码单元

# storage响应存储变化
```js
    window.addEventListener('storage',e => {})
```