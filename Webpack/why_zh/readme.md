# WangHaoyu 知乎文章
- core存放webpack核心代码
  - index.js 核心入口文件
  - webpack.js webpack()方法实习
- example 存放打包的实例项目
  - webpack.config.js 配置文件
- loaders 自定义loader
  - loader 本质是一个函数，接受源代码作为入参同时返回处理后的结果
- plugins 自定义plugin  
  - webpack插件本质上就是通过发布订阅的模式，通过compiler上监听事件。然后再打包编译过程中触发监听的事件从而添加一定的逻辑影响打包结果

## 整个过程
1. 读取配置文件
2. 读取shell参数
   - 合并参数
3. 创建Compiler对象
   1. 保存配置参数
   2. 创建hooks
   3. 初始化内部对象
4. 加载注册插件
5. 调用Compiler.run执行编译
   1. 执行订阅
   2. 读取文件内容
   3. 读取入口文件
   4. 匹配对应loader
   5. 通过babel编译模块
   6. 递归编译
6. 构建chunk
   - 通过modules entries依赖关系生成
7. 将编译结构输出到硬盘