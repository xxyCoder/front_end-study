# 常见的Plugin和Preset
- Preset是一些Plugin整合称为包
- babel-preset-env，可以将高版本JS代码根据内置的规则转译成为低版本的JS代码
- babel-preset-react，对JSX进行转译
- babel-preset-typescript，对TS进行编译
- Plugin本质是一个对象，里面有一个visitor属性

## babel-core
- 核心编译库，对代码进行 词法分析 --> 语法分析 --> 语义分析过程，从而生成AST语法树
- 相当于@babel/parse 和 @babel/generator这两个包的合体

## polyfill
- babel-preset-env仅仅转换最新的ES语法，并不会转换对应的API和实例方法，polyfill的作用就是补充这部分
- 其是通过往全局对象身上添加属性以及直接修改内置对象的Prototype添加方法
  - useBuiltIns -- "usage"| "entry"| false
    - false，表示仅仅转换最新的ES语法
    - entry，需要手动引入一次core-js
    - usage，配置为entry会全部引入，该选项会根据浏览器的兼容以及代码所用到的API进行按需引入polyfill

## runtime
- 另外一种实现方式，更像一种按需加载，需要手动引入
- 对于手动引入的时候，会给代码注入一些工具函数，包含在编译后的每个文件中，过于冗余

## plugin-transform-runtime
- 解决上述问题
- 智能化分析需要转译的JS代码
- 提供helpers参数，将工具函数转换为require语句