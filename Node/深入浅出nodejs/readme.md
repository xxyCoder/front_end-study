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

# 内存控制

## V8的垃圾回收机制
- 主要基于分代式垃圾回收机制，分为新生代和老生代
- 新生代中的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象
- v8堆的整体大小就是新生代加老生代所使用的内存空间
- 新生代的内存由两个reserverd_semispace_size_所构成，按机器位数不同，在64位和32位分别是16MB和8MB，故总的是32MB和16MB
- 老生代在64位是1400MB，32位系统是700MB
- V8堆内存最大的保留空间是4*reserved_semispace_size_+max_old_generation_size，故64位下是1464MB，32位下是732MB
- 新生代对象主要是通过Scavenge算法进行垃圾回收，它将堆内存一分为二，每一部分空间空间成为semispace，这两个空间中只有一个处于使用中（称为from），另一个是闲置空间（称为to）；分配对象的时候先分配到from空间，当进行垃圾回收的时候，将from空间中存活的对象复制到to空间，而非存活对象则释放，完成复制后，from和to空间对换，同时from空间存活对象在复制to空间需要检查是否可以晋升到老生代空间，如果没有才复制到to空间
  - 对象晋升条件主要是：一个是该对象是否经历过Scavenge回收（根据地址空间判断），另一个是to空间的内存占用比超过限制（超过25%）
- 老生代主要采用Mark-Sweep和Mark-Compact相结合的方式进行垃圾回收
  - Mark-Sweep是标记清除的意思，分为标记和清除两个阶段，遍历堆所有对象，并标记活着的对象，在清除阶段只清除没有被标记的对象
  - Mark-Compact将活着的对象往一端移动，移动后清理边界外的（让内存在清理之后连续），但是在内存不足以对从新生代中晋升的对象分配时才使用Mark-Compact