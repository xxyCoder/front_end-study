# EventTarget接口
- addEventListener() 绑定事件的监听函数
- removeEventListener() 移除事件的监听函数
  - 函数必须是同一个函数，不能是相同函数内容，第三个参数也必须相同
- dispatchEvent() 触发事件
  - 接受一个event事件
  - 返回值可以判断事件是否被取消了