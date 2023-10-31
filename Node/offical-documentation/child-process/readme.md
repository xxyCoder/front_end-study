# 子进程
- spawn(command[,agrs][,options])
  - cwd 子进程的工作目录
  - env 环境变量
  - argv0 不设置则为command
  - detached 子进程是否独立其父进程运行
  - signal 中止信号
  - timeout 子进程运行最长时间
  - stdio 子进程的标准输入输出