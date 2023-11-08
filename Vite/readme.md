# vite组成
- 一个开发服务器，基于ES6模块提供了丰富的内建功能
- 一套构建指令，使用rollup打包你的代码，并且是预配置的

Vite意在提供开箱即用的配置

# 什么是构建工具
- 对于TS文件，需要tsc将ts代码转换为js代码
- React/Vue，需要按照react-compiler/vue-compiler，将JSX或.vue文件转换为render函数
- less/stylus，需要less-loader/stylus-loader等编译工具
- 语法降级，如果浏览器不支持高版本语法
- 体积优化
- 以上都由构建工具帮助我们完成，还不需要考虑构建的顺序，代码改变之后也可以自动化完成

# 依赖性预构建
- 首先vite会找到依赖项，然后调用esbuild将其他规范的代码转换成esmodule规范，然后重写导入的url路径，将文件放到当前目录的下node_modules/.vite/deps进行缓存，同时对esmodule规范的各个模块进行统一集成
- 解决了三个问题
  - 不同的包有不同的导出格式
  - 对路径的处理可以直接使用.vite/deps，方便路径重写
  - 网络多包传输的性能，无论有多少export或import，vite都会尽可能将其集成，最后生成一个或几个模块
- 对于vite.config.js为什么可以使用es module规范，是因为vite会先于node去解析配置文件，将es module转变为commonJS规范

# 自动搜寻依赖
- 没有对应的依赖，vite将抓取源码并自动搜寻引入的依赖项
- 解析后的依赖会以HTTP头max-age=31536000,immutable 强缓存

# 什么时候重新运行预构建？
- 当如下一项发生改变，才需要重新运行预构建
  - package.json的dependencies列表
  - 包管理器的lockfile，例如package-lock.json
  - 在vite.config.js相关字段配置过

# 环境变量
- vite内置了dotenv第三方库
  - 但不会预先读取env配置文件，因为vite.config.js的配置文件中envDir可以改变配置文件的地址，预先读取.env没有意义
- 调用loadEnv，手动确定环境变量文件位置
  1. 找到.env文件 解析其中环境变量，并放进一个对象中
  2. 根据传入的mode对这个文件进行拼接 `.env.${mode}`，并根据结果去解析对应的配置文件进行解析，并放入一个对象里
```js
const baseEnvConfig = 读取.env配置
const modeEnvConfig = 读取`.env.${mode}`的配置
const lastEnvConfig = {...baseEnvConfig,...modeEnvConfig}
```
- 对于客户端，会注入到import.meta.env中
  - 但vite做了一个拦截，防止将隐私性的变量直接放入import.meta.env中，如果环境变量以VITE_开头，则不会拦截
  - 配置文件中 envPrefix 去修改这个开头

# vue文件处理
- vue内部通过@vue/compiler-sfc解析单文件组件，把组件分成template、style、script三个部分
- 在node环境下，把template内部解析成render函数，并且和script的内容组成组件对象返回
- 后端判断.vue文件请求，通过compilerSFC.parse方法解析Vue组件，并设置Content-Type="text/javascript"

# css文件处理
```js
const p = path.resolve(__dirname,url.slice(1));
const file = fs.readFileSync(p,"utf-8");
const content = `
  const css = "${file.replace(/\n/g,'')}";
  let link = document.createElement("style");
  link.setAttribute("type","text/css");
  document.head.append(link);
  link.innerHTML = css;
  export defualt css;
`
response.setHeader("Content-Type","text/javascript");
response.send(content);
```