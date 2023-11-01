# 什么是构建工具
- 对于TS文件，需要tsc将ts代码转换为js代码
- React/Vue，需要按照react-compiler/vue-compiler，将JSX或.vue文件转换为render函数
- less/stylus，需要less-loader/stylus-loader等编译工具
- 语法降级，如果浏览器不支持高版本语法
- 体积优化
- 以上都由构建工具帮助我们完成，还不需要考虑构建的顺序，代码改变之后也可以自动化完成

# 依赖性预构建
- 首先vite会找到依赖项，然后调用esbuild将其他规范的代码转换成esmodule规范，然后放到当前目录的下node_modules/.vite/deps，同时对esmodule规范的各个模块进行统一集成
- 解决了三个问题
  - 不同的包有不同的导出格式
  - 对路径的处理可以直接使用.vite/deps，方便路径重写
  - 网络多包传输的性能，无论有多少export或import，vite都会尽可能将其集成，最后生成一个或几个模块