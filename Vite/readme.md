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

# no-bundle
- 在Vite项目中，一个import语句代表一个Http请求
- 利用浏览器原生的es模块代码，实现开发阶段的dev server，进行模块的按需加载，而不是先整体打包再进行加载
- 开发环境省略了打包过程，这也是为什么比较快的原因
- 对于生产环境使用了rollup进行打包，并采取一系列打包优化手段

# 依赖性预构建
- 对于第三方依赖包的代码仍然会选择打包，使用esbulid完成这过程
- 首先vite会找到依赖项，然后调用esbuild将其他规范的代码转换成esmodule规范，然后重写导入的url路径，将文件放到当前目录的下node_modules/.vite/deps进行缓存，同时对esmodule规范的各个模块进行统一集成
  - 设置了http强缓存(max-age)
  - 本地缓存，当以下有改动则缓存失效
    - package.json的dependencies字段
    - 各种包管理器的lock文件
    - optimizeDeps配置内容
- 解决了三个问题
  - 不同的包有不同的导出格式
  - 对路径的处理可以直接使用.vite/deps，路径重写
  - 网络多包传输的性能，无论有多少export或import，vite都会尽可能将其集成，最后生成一个或几个模块
- 对于vite.config.js为什么可以使用es module规范，是因为vite会先于node去解析配置文件，将es module转变为commonJS规范

## 手动开启
- 入口文件参数optimizeDeps.entries指定自定义预构建入口文件数组
  - 默认是以index.html作为入口扫描到的项目用到的第三方依赖进行编译
- 添加额外依赖optimizeDeps.include决定了可以强制预构建的依赖项
  - 动态import导致只有运行时才能被识别到，导致vite识别到后二次构建

# 自动搜寻依赖
- 没有对应的依赖，vite将抓取源码并自动搜寻引入的依赖项
- 解析后的依赖会以HTTP头max-age=31536000,immutable 强缓存

# 什么时候重新运行预构建？
- 当如下一项发生改变，才需要重新运行预构建
  - package.json的dependencies列表
  - 包管理器的lockfile，例如package-lock.json
  - 在vite.config.js相关字段配置过

# index.html与根目录
- 在一个Vite项目中，index.html在项目最外层而不是public文件夹下，这是有意而为之的：在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件
- Vite 将 index.html 视为源码和模块图的一部分
  
# 环境变量
- vite内置了dotenv第三方库
  - 但不会预先读取env配置文件，因为vite.config.js的配置文件中envDir可以改变配置文件的地址，以及root会影响项目根目录位置，预先读取.env没有意义
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

# eslint处理

## parser 解析起
- eslint默认使用Espree进行ast解析，其能识别大多数的ECMAScript语法，但是不支持ts，因此需要引入@typescript-eslint/parser解决问题

## parserOptions 解析器选项
- ecmaVersion启用什么版本的js语法
- sourceType，默认为script，如果使用es module则设置为module
- ecmaFeatures，表示额外想要使用的对象

## rules 具体代码规则
- 手动调整哪些代码规则

## extends
- 相当于继承另一份eslint配置
  - 从eslint本身继承
  - 从类似eslint-config-xx的npm包继承
  - 从eslint插件继承

## env和global
- 分别表示运行环境和全局变量

# 静态资源处理
- 配置别名 resolve.alias: {} 不仅在js的import生效，css代码的@import和url导入语句也可生效
- Vite对其他类型如媒体类、字体类、文本类也做了内置支持，如果存在其他格式的静态资源可以使用assetsInclude: []配置让vite支持加载
- Vite引入静态资源的时候，也支持在路径最后添加特殊的query后缀
  - ?url表示获取资源的路径，只想拿到文件路径而不是文件内容
  - ?raw表示获取资源的字符串，只想拿到资源的原始内容
  - ?inline表示资源强制内联
- 构建静态资源有俩种方式，一种是打包成单文件，一种是通过base64内联到代码中
  - 默认是4kb作为分界线，可以通过build.assetsInlineLimit配置
- 图片压缩：vite-plugin-imagemin插件
- 雪碧图：vite-plugin-svg-icons

# 批量加载
- import.meta.glob('../assets/icons/logo-*.svg') 返回对象，值都是动态import
- import.meta.globEager('../assets/icons/logo-*.svg') 返回对象，同步加载，值都是module对象