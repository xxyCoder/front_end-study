# Babel
- 是一个JS编译器，可以转换语法、源代码替换等

## 常见的plugin和preset
- preset就是一些plugin组成的合集
- @babel/preset-env 可以将高版本的JS代码根据内置的规则转译成低版本的JS代码
- @babel/preset-react   将JSX进行转译
- @babel/preset-typescript  将TS转译成JS

## 配置
- babel-loader  本质是个函数，将匹配到的jsx?/tsx?的文件交给babel-loader
- babel-core    将代码进行词法分析->语法分析->语义分析生成AST
- babel-preset-env  告诉babel以什么规则进行转译
```js
const core = require('@babel/core');
function babelLoader(sourceCode,options) {
    core.transform(sourceCode,{
        presets:['babel-preset-env'],
        plugins: [...]
    });
    return targetCode;
}
```

## polyfill
- babel-preset-env仅仅只会转换最新的ES语法，并不会转换对应的API和实例方法，比如Array.from，需要polyfill在Array上添加实现方法
- @babel/polyfill   通过往全局对象以及直接修改内置对象的prototype上添加方法实现polyfill
  - "useBuildIns": false    表示仅仅转换最新的ES语法，不转换API和实例方法
  - "useBuildIns": "entry"  全量引入，但是会造成包体积过大
  - "useBuildIns": "usage"  按需引入
- @babel/runtime    按需加载的解决方法，哪里需要实现方法，就在文件顶部添加import xxx from 'babel-runtime/core-js/xxx'
  - 需要手动引入
  - 会生成冗余代码
  - 解决了@babel/polyfill造成全局变量污染
- @babel/plugin-transform-runtime
  - 智能化引入

# EsLint
- 