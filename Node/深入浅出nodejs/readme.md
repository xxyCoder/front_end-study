# 异步IO
- 对于任务的执行，nodejs选择利用单线程，远离多线程死锁、状态同步等问题；利用异步IO，让单线程远离阻塞，以便更好使用CPU
- 为了弥补单线程无法利用多核CPU的缺点，Node提供了类似前端web worker的子进程
- 由于Windows平台和*nix平台的差异，Node提供了libuv作为抽象封装层，使得所有平台的兼容性的判断都由这一层来完成，并保证上层的Node与下层的自定义线程以及IOCP之间各自独立
- Node是单线程指的是JS执行在单线程，无论是*nix还是windows，内部完成IO任务的另有线程池
- 在Node中，除JS是单线程外，Node自身是多线程的

## 事件循环
- 在进程启动时，Node便会创建一个类似while(true)的循环，每一次循环称为Tick
- 每次Tick就查看是否有事件待处理，每个事件循环都有一个或多个观察者，而判断是否有事件要处理就向观察者循环是否有要处理的事件
- JS调用node的核心模块(fs)，核心模块调用C++内建模块(Open)，内建模块通过libuv进行平台判断并系统调用，调用过程中创建一个请求对象，JS传入的参数和当前方法都被封装在这个请求对象中，对象封装完将其推向线程池等待执行，这样无论IO是否阻塞都不会影响JS线程后续执行；当IO操作完成后，将结果存储并通知操作已完成，将完成的IO交给观察者

## 非异步IO的API
- setTimeout、setInterval、setImmediate、process.nextTick
- 调用setTimout和setInterval创建的定时器被插入到观察者内部的红黑树中，每次Tick执行完，都会取出判断是否超过指定时间，如果超过就形成一个事件，其回调立即执行，但是setInterval是需要重复性检查和执行
- 每次调用process.nextTick，只会将回调函数放入队列，在下一轮Tick时取出，时间复杂度比红黑树好
- setImmediate与process.nextTick类似，都是将回调函数延迟执行，但是process.nextTick的优先级高于setImmediate
  - process.nextTick属于idle观察者，而setImmediate属于check观察者，idle观察者优先check观察者
  - process.nextTick结果保存在一个数组中，而setImmediate的结果保存在链表中

## node流程阶段
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