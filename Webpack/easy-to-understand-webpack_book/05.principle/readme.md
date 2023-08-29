# 工作原理
- 初始化：启动构建，读取与合并配置参数，加载plugin、实例化Compiler
- 编译：从entry开始，针对每个module串行调用对应的Loader翻译文件内容，再找到该module依赖的module，递归进行编译
- 输出：对编译后的module组合成chunk，把chunk转换成文件，输出