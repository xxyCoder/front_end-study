# 官网摘要

## entry和context

### context
- 需要写成绝对路径，用于配置entry和loader中的路径，没有由process.cwd()决定

### entry
- 打包的入口文件，如果传入一个字符串或数组，则chunk被命令为main，如果是对象，则chunk的name由key决定
- filename比output.filename优先级高
- dependOn可以与另一个入口chunk共享模块

## output
- assetModuleFilename相比filename，是应用于asset module（静态资源如图片），指定在output.path下的目录
- publicPath，是html文件中引入chunk、runtime等资源的每个url前缀，以“/”结尾
- asyncChunks是否开启异步chunk从initial chunks中拆出来
- chunkFilename指定非initial chunk的名字
- compareBeforeEmit检查写入到文件系统的时候是否存在相同内容的文件（存在相同文件则不会再次写入），默认为true
- hotUpdateChunkFilename自定义热更新chunk的文件名
- iife是否用立即执行函数包裹代码，默认为true
- library输出一个库，为入口文件做导入