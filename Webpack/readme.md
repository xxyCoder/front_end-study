# 官网摘要

## entry和context

### context
- 需要写成绝对路径，用于配置entry和loader中的路径，没有由process.cwd()决定

### entry
- 打包的入口文件，如果传入一个字符串或数组，则chunk被命令为main，如果是对象，则chunk的name由key决定
- filename比output.filename优先级高
- dependOn可以与另一个入口chunk共享模块

## runtime chunk
- 小的js文件，包含了在模块化代码中运行所需要的逻辑和函数
- 对import和require进行替换
- 有模块缓存数据结构

## output
- assetModuleFilename相比filename，是应用于asset module（静态资源如图片），指定在output.path下的目录
- publicPath，是html文件中引入chunk、runtime等资源的每个url前缀，以“/”结尾
- asyncChunks是否开启异步chunk从initial chunks中拆出来
- chunkFilename指定非initial chunk的名字
- compareBeforeEmit检查写入到文件系统的时候是否存在相同内容的文件（存在相同文件则不会再次写入），默认为true
- hotUpdateChunkFilename自定义热更新chunk的文件名
- iife是否用立即执行函数包裹代码，默认为true
- library输出一个库，为入口文件做导入

## module
- 处理项目中不同类型的模块
- parser.javascript.exportsPresence指出在 “import...from...”和”export...from...“中无效导出名称行为
  - 对于commonjs语法导出导入不正确不会报任何错误
  - 即使该属性设置为false，es6的export导出了不正确的也会报错
- noParse告诉webpack不解析这些模块，但是仍然会构建在产物中，适用于第三方或者不需要处理的模块进行解析，这些模块内部没有import、require、define等调用或者已经被预处理过
- rules创建模块时，匹配请求的规则数组，这些规则匹配上则应用对应的loader或parser进行解析
  - rule可以分为三个部分：条件、结果和嵌套规则
    - 条件分为资源文件的绝对路径和请求者文件的绝对路径
    - 结果只在匹配条件后使用
    - 嵌套rule可以通过rules或oneOf指定
  - include 引入符合模块，进一步限制test等
  - exclude 排除符合的模块，优先级高于include
  - oneOf当规则匹配的时候，只应用第一个被匹配的
  - loader是use:[ { loader } ]的别名
  - generator.filename覆盖output.assetModuleFilename
  - resourceQuery资源查询匹配的条件（?后面的字段）
  - fullySpecified表示是否需要为文件提供扩展名

## webpack中loader有两个执行阶段 normal和pitching

### normal阶段
- 在loader文件中导出的函数就是normal loader
- 会安装规则依次应用对应的loader，先前置(pre) -> 普通(normal) -> 行内(inline) -> 后置(post)

### pitching阶段
- 是normale阶段执行loader的逆序，导出的loader中有可选选项pitch，该选项赋值的函数就是pitching loader
- 会在normal阶段前执行，如果该pitching loader有返回值则跳过后续pitching loader进入前一个loader的normal阶段（即后续的normal loader不执行）

## resolve
- 设置模块如何被解析
- alias创建import或require引入资源的别名
  - 搭配$表示精准匹配
  - 设置为false告知webpack忽略模块
- aliasFields指定了解析别名（改别名指定的值也是包）的时候从包的哪个入口文件开始
- conditionNames定义一个库的入口，匹配列存放在package.json的exports字段
- enforceExtension表示是否强制引入资源文件要有扩展名
  - 不建议使用，引入第三方资源会报错要求扩展名
- extensionAlias将扩展名与别名进行映射
- extensions如果文件没有后缀名则尝试按该字段给的后缀名顺序去解析
- fallback是当正常解析失败后，重定向模块请求去其他位置
  - 可以使用require.resolve拿到模块路径而不是加载
- mainFields用于解析模块的时候从那个入口字段开始
- mainFiles用于解析目录时要用的文件名，资源只指定了目录的话则会按照该字段依次匹配进行解析
- modules告诉webpack解析模块应该搜索的目录
- preferRelative启用后将更倾向于请求解析为相对请求而不是去modules字段中找
- restrictions限定解析列表

## resolveLoader
- 用于解析webpack的loader包路径

## Optimization
- 从webpack4开始，会根据mode执行不同的优化，也可以手动配置了
- chunkIds告知webpack选择模块id的时候使用哪种算法，如果使用数字id，会影响contenthash导致缓存失效
  ```js
    (self["webpackChunk"] = self["webpackChunk"] || []).push([[chunkId],{模块内容...}])
  ```
- emitOnErrors，在编译的时候有错误就会发送静态资源，确保出错的静态资源被发送，不终止打包过程，不过会在运行时报错
- flagIncludedChunks该选项影响了runtime的生成以及在模块变更时需要重新加载全部模块，设置为true表示webpack将要记录哪些块已经被包含，从而在模块变更时只需要加载模块发生变更的，而不是全部加载
- mangleWasmImports告知webpack修改导入为更短的字符串，来减少Wasm（WebAssembly是一种用于在浏览器中运行高性能代码的二进制指令格式）大小
- mergeDuplicateChunks合并含有相同模块的chunk
- minimize使用插件进行压缩
- minimizer允许定义一个或多个TerserPlugin实例覆盖默认压缩工具
  - 可以使用 '...' 来访问默认值
- moduleIds为模块提供id的算法
- providedExports可以开启对模块导出的自动分析，提供导出的信息给模块使用者，用于优化代码分割
  - 没有开启而进行代码分割，webpack默认会尝试分析模块的导出，它会尽可能智能地根据模块间的依赖关系和使用情况进行代码分割
  - 通过明确定义的导出可以更好的控制那些部分应该被分割成单独的块
- removeEmptyChunks 移除空chunks，默认为true
- splitChunks对于动态导入的模块，可以进行分割
- usedExports启用tree-shaking技术，删除导出但是未被使用的代码
  - tree-shaking通常与es6模块语法一起工作

## devServer
- 影响dev-server的配置选项
- client.logging允许在浏览器中设置日志级别
- client.overlay当出现变异错误或警告时是否全屏覆盖
- client.reconnect尝试重新连接客户端的次数，为true表示无限次尝试
- client.webSocketURL指定webSocket服务器
- compress是否启用gzip压缩
- devMiddleware为webpack-dev-middleware提供处理webpack的资源的配置项
  - publicPath是dev-server将资源打包放入内存后浏览器通过该路径可以获取，将覆盖output.publicPath
- headers为所有响应添加响应头
- hot启用热更新
- liveReload当监听到文件变化的时候重新加载或刷新页面
  - 必须禁用hot并且开启watch
- open打开默认浏览浏览器
- port监听请求的端口
- onListening开始监听端口连接执行自定义函数
- proxy代理
- static允许从目录提供静态资源的文件
- watch监听文件改变
- watchFiles监听那些文件改变