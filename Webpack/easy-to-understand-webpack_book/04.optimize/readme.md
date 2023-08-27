# 优化
## 缩小文件搜索范围
- 遇到导入语句webpack会做两件事情
  - 根据导入语句寻找对应要导入的文件
  - 根据导入文件的后缀，使用配置Loader去处理文件
  
### 优化module
- loader
  - 由于Loader对文件的转换操作很耗时，需要让尽可能少的文件被Loader处理
  - 可以使用include去命中哪些文件需要处理
- noParse
  - 有些库又庞大又没有采用模块化标准，解析耗时也没有意义

### 优化resolve配置
- modules
  - 其默认值是['node_modules']，含义是先从当前工作目录找，然后去上一级，直到根目录
  - 如果第三方依赖都在根目录，那么没必要一级一级像上找，可以直接指明
- alias
  - 第三方库如react有react.js和react.min.js，可以通过别名将react映射到react.min.js，从而跳过递归解析
- extensions
  - 这个列表越长且越正确的后缀在越后面，那么尝试次数就越多
  - 故后缀列表越少越好
  - 频率出现越高的放越前面
  - 尽量在导入语句都带后缀

## 使用DLLPlugin
- 对于哪些重复使用的模块的动态链接库只需要编译一次，在之后的构建过程中被动态链接库包含的模块不在重新编译，而是直接使用
- DLLPlugin插件：用于打包出一个个单独的动态链接库文件
- DLLReferencePlugin插件：用于在主要配置文件中去引入DLLPlugin插件打包好的动态链接库文件

## 使用HappyPack
- 让webpack可以将任务分解成多个子进程去并发执行，子进程处理完任务再把结果发送给主进程
- 实例化一个happyPack就是告诉核心处理器如何通过一系列loader去转换一类文件

## 使用ParallelUglifyPlugin
- 当webpack有多个JS文件需要输出和压缩时，可以使用ParallelUglifyPlugin开启多个子进程，把多个文件的压缩任务分配给多个子进程完成

## 自动刷新
### 文件监听
- watch
- watchOptions

## 区分环境
```js
if(process.env.NODE_ENV === "production") {
  
} else {

}
```
- 使用DefinePlugin

## 压缩代码