# 并行构建
- 针对某种计算任务创建子进程，之后将运行所需参数通过 IPC 传递到子进程并启动计算操作，计算完毕后子进程再将结果通过 IPC 传递回主进程，寄宿在主进程的组件实例，再将结果提交给 Webpack

## Thread-loader
- 以多进程方式加载文件
- 在加载文件时创建新的进程，在子进程中使用 loader-runner 库运行 thread-loader 之后的 Loader 组件，执行完毕后再将结果回传到 Webpack 主进程，从而实现性能更佳的文件加载转译效果。
- 相关配置
  - workers 子进程数量
  - workerParalleJobs   单个进程中执行并发的任务数量
  - poolTimout  超过改时间，子进程关闭
  - workerNodeArgs  用于设置启动子进程时，额外附加的参数

## Parallel-Webpack
- 为配置文件中导出的每个 Webpack 配置对象启动一个独立的构建进程，从而实现并行编译的效果
- 根据传入的配置项数量，调用 worker-farm 创建复数个工作进程；
- 工作进程内调用 Webpack 执行构建；
- 工作进程执行完毕后，调用 node-ipc 向主进程发送结束信号

## 并行压缩
- Webpack5使用Terser实现