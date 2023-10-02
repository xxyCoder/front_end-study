# web worker
- 为JS创建多线程环境，允许主线程创建worker线程，主线程运行的同时，worker线程运行在后台，两者互不干扰
- 一旦worker被创建，就会始终运行，不会被主线程上的活动打断，这也造成了worker比较耗费资源，不应该被过渡使用
- 有同源限制，分配必须与主线程脚本文件同源
- DOM限制，无法读取主线程所在页面的DOM对象、document对象、window对象等，可以使用navigator对象和location对象
- 通信限制，worker线程与主线程不在一个上下文环境，不能直接通信，必须通过消息完成
- worker无法读取本地文件，它所加载的脚本必须来自网络
- worker有自己的全局对象，不是主线程的window，而是专门为worker定制的全局对象