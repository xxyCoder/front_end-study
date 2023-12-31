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
  - resolve.fullySpecified表示是否需要为文件提供扩展名
  - type
    - asset/resource 对标file-loader
    - asset/inline 对标url-loader
    - asset/source 对标raw-loader 适用于svg这种需要原封不动打包进去

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

## cache
- 缓存生成的webpack模块和chunk，设置为false表示禁止使用，开启缓存后在首次构建完将module、chunk、moduleGraph三类对象序列化并记录到缓存文件中，在下次构建开始时尝试恢复从而跳过执行loader链、解析AST等操作
- type: memory | filesystem
- buildDependencies额外的依赖文件，当这些文件内容发生变化时，缓存会完全失效而执行完整的编译构建，通常可设置为项目配置文件
- cacheDirectory type=filesystem的缓存路径
- compression用于缓存文件的压缩
- managedPaths指定目录数组，webpack构建时会跳过新旧代码哈希值与时间戳对比，直接使用缓存版本
- maxAge允许未使用的缓存留在文件系统缓存中的时间，type=filesystem生效
- maxGenerations定义内存中缓存未使用的生命周期
  - count 在count次编译中未使用的缓存删除
  - Infinity 缓存将永远保存
- profile跟踪并记录type=filesystem缓存项的详细信息
- version缓存数据的版本，不同版本不会重用缓存和重载当前的内容

## devtool
- 如何生成source map

## watch和watchOptions
- 监听文件改变后重新编译
- watchOptions.aggregateTimeout当第一个文件修改后，会在重新构建前增加延迟，以毫秒为单位
- watchOptions.ignored排除对某些的监听
- watchOptions.poll设置轮询时间，以毫秒为单位，为true则启用默认时间5007ms

## external
- 防止将某些import的包打包到bundle中，而是运行时再去从外部获取这些依赖扩展，列入从CDN引入

# 打包逻辑
1. 合并参数
  - 命令行参数和webpack.config.js等文件
2. create compiler object
3. create compilation object
4. 遍历entry配置
  - Compilation.addEntry()
5. 创建Module对象
6. 根据module类型解析loaders，调用loader执行模块转译
7. 模块内容转AST，寻找依赖，构建完整模块依赖关系图
8. 遍历entry构建chunk
9. 生成运行时代码
10. 创建asset，调用fs.write写入output

# source map
- 主要作用是将经过压缩、混合的产物代码还原回未打包的原始形态，帮助开发者在生产环境中精确问题发生的行列位置
- 遍历产物文件assets数组，调用webpack-sources提供的map方法，计算出assets与源码之间的映射关系
- V3 版本 Sourcemap 文件由三部分组成
  - 开发者编写的原始代码；
  经过 Webpack 压缩、转化、合并后的产物，且产物中必须包含指向 Sourcemap 文件地址的 //# sourceMappingURL=https://xxxx/bundle.js.map 指令；
  - 记录原始代码与经过工程化处理代码之间位置映射关系 Map 文件
- 页面初始运行时只会加载编译构建产物，直到特定事件发生 —— 例如在 Chrome 打开 Devtool 面板时，才会根据 //# sourceMappingURL 内容自动加载 Map 文件，并按 Sourcemap 协议约定的映射规则将代码重构还原回原始形态

## devtool规则详解
- eval：生成的模块代码会包裹进一段eval函数中，且模块的source map信息通过// # sourceURL直接挂在模块代码内
- source-map：产物会额外生成.map文件
- cheap：会抛弃列维度信息
- module：只在cheap关键字下生效，Webpack 根据 module 关键字判断按 loader 联调处理结果作为 source，还是按处理之前的代码作为 source
- nosources：生成的文件内容不包括源码内容，即sourceContent字段
- inine：将source map内容编码为base 64 url直接追加在产物中
- hidden：当 devtool 包含 hidden 时，编译产物中不包含 //# sourceMappingURL= 指令，要使用需要手动加载

# HMR
- 设置devServer.hot为true
- 代码中调用module.hot.accept接口，将模块安全的替换为最新代码

## 实现过程
- 使用了webpack-dev-server托管静态资源，同时以runtime方式注入一段处理hmr逻辑客户端代码
- 浏览器加载页面后与web socket连接
- webpack监听文件变化后，增量构建变更模块，通过web socket发送hash事件
- 浏览器接收到hash事件后，请求manifest资源文件（[hash].hot-update.json），请求变更模块
- 拿到变更模块（[hash].hot-update.js）触发变更模块的module.hot.accept回调执行变更逻辑

# 面试题
- split-chunk分包过多怎么解决？
  1. limitChunkCountPlugin限定数量
  ```js
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunk: cnt
      })
    ]
  ```
  2. 调整splitChunks配置（minChunk、minSize）
  3. 按需加载和懒加载（初次加载就不会加载所有分包）
- 图片如何优化？
  1. 图片压缩 image-webpack-loader
  ```js
  module: {
    rules: [{
      test: /\.(gif|png|jpe?g|svg)$/i,
      type: "asset/resource",
      use: [{
        loader: "image-webpack-loader",
        options: {
          disable: process.env.NODE_ENV === 'production', // 比较耗时，在生产环境使用
          // 压缩jpe?g
          mozjpeg: {
            quantity: 80
          },
          // 压缩png
          optpng: {},
          // 压缩svg
          svgo: {},
          // 压缩gif
          gifsicle: {},
          // 将jpg/png转换为webp
          webp: {}
        }
      }]
    }]
  }
  ```
  2. 雪碧图 webpack-spritesmith
  ```js
  resolve: {
    modules: ["node_modules", "assets"]
  },
  plugin: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/icons'),
        glob: "*.png"
      },
      target: {
        image: path.resolve(__dirname, "src/assets/sprite.png"),
        css: path.resolve(__dirname, "src/assets/sprite.less")
      }
    })
  ]
  ```
    - 该插件会将src.cwd中目录所匹配的src.glob合并成一张大图片，保存在target.image中，同时生成兼容性的sass/less/stylus预处理的mixins代码
  3. 响应式图片 即为不同设备提供不同尺寸的图片 responsive-loader sharp
  ```js
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      oneOf: [{
        type: "javascript/auto",
        resourceQuery: /sizes?/, // 并非所有图片都需要，使用这个进行过滤
        use: [{
          loader: "responsive-loader",
          options: {
            adapter: require("responsive-loader/sharp")
          }
        }, {
          type: "asset/resource"
        }]
      }]
    }]
  };
  ```
- tree-shaking怎么实现
  1. 使用esm规范
  2. 配置optimization.usedExports: true
  3. 启动优化
    - mode: production
    - optimization.minimize: true
    - 提供optimization.minimizer数组
  - 需要标记出模块哪些导出值没有使用过的，再是使用压缩插件删除导出值中未使用的东西
    - 将ESM模块导出语句转换为Dependency对象并记录到模块的dependencies集合
    - 遍历module对象的dependencies集合找到Dependency依赖对象转换为ExportInfo记录到ModuleGraph对象中
    - 便利每个module对象的ExportInfo数组，执行compilation.getDependencyReferencedExports 方法确定是否有被其他模块使用，有使用则标记