# 探究Node中EventLoop与V8下的差异
## 事件队列
- JS本质是基于栈的形式去执行代码，而事件队列正是负责将执行函数发送到栈中处理
  - 有任务先推入事件队列，如果当前执行栈执行完任务，则从事件队列中拿新任务，否则继续执行栈中的任务

## 浏览器
- 完整的EventLoop是会拿出一个macro来执行同时在macro执行完毕后清空本次队列中所有micao任务

## Node
- Process.nextTick 执行时机是在同步任务执行完成后，即将将micro-task推入栈中时优先将Process.nextTick推入栈中执行
- setImmediate 宏任务队列处理 
- I/O操作 宏任务队列处理

### node流程阶段
1. timers 执行setTimeout() 和 setInterval() 回调函数
2. pending callbacks 上一次循环队列中，还未执行完成会在这个阶段执行
3. idle,prepare 内部nodejs调用
4. poll 轮询，检测新I/O相关回调，这一阶段可能阻塞（即后面阶段可能不执行）
   - 如果轮询队列不是空的，则执行直到为空
   - 如果轮询队列是空的
     - 脚本被setImmediate调度，则转到check阶段
     - 没有被setImmediate调用，则等待回调被添加到队列中
5. check 检测setImmediate 回调函数在这个阶段执行
6. close callbacks 执行一系列关闭函数，如socket.on('close',...)