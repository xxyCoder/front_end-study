# WangHaoyu 知乎文章
- core存放webpack核心代码
  - index.js 核心入口文件
  - webpack.js webpack()方法实习
- example 存放打包的实例项目
  - webpack.config.js 配置文件
- loaders 自定义loader
- plugins 自定义plugin  
  - webpack插件本质上就是通过发布订阅的模式，通过compiler上监听事件。然后再打包编译过程中触发监听的事件从而添加一定的逻辑影响打包结果
- loader 本质是一个函数，接受源代码作为入参同时返回处理后的结果