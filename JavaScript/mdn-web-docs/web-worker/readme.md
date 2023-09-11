# web worker
- 创建一个对象，运行一个JS文件，这个文件将在worker线程中运行；worker运行在另一个全局上下文
- 不能操作DOM节点，也不能使用window对象的默认方法和属性
- 与主线程通过 postMessage() 方法发送各自消息，使用onmessage事件函数处理响应消息（消息在message中的data）