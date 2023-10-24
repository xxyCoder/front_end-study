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

# EsLint工作流程
1. 开始文件eslint/bin/eslint.js执行require("../lib/cli").execute() 去解析参数
  - 第一个参数是命令行提供的参数
  - 第二个是命令行中--stdin后面的文本，如果没有则为null
  - 第三个参数标记，调用值设置为true
  - 在execute的过程中会拿到files即第一个参数提供的文件名数组和useStdin是否有第二个参数，经过allowFlatConfig && await shouldUseFlatConfig()之后判断创建的是FlatESLint 还是 ESLint，赋值给ActiveESLint（一般都是ESLint）
2. 之后创建ActiveESLint实例（即ESLint），调用自身方法lintFiles，将files作为参数传入
   - 拿到cliEngine，执行executeOnFiles方法
     - 执行verifyText遍历文件内容
       - 执行linter.verifyAndFix校验文件内容和修改
         - 有个passNumber记录修补次数，如果修补次数大于10次或修补成功就跳出循环
         - 执行linter.verify去校验
           - 执行_verifyWithConfigArray方法，传入源代码和config配置项
             - 拿到用户写在eslint配置文件中的内容
             - 有process则执行
             - 然后执行_verifyWithoutProcessors解析代码为ast语法树，调用runRules将ast语法树节点拍平，进行traverse遍历，并调用规则
               - 遍历每个规则，拿到编写插件需要提供的meta信息和create函数，并调用create函数返回了一个visitor对象
                 - 继续遍历visitor对象，拿到方法属性，以属性名作为键，监听该属性名触发对应方法
               - 遍历拍平的每个节点，触发对应事件
   - 如果有fix选项，那么就将result.output赋值为修复后的output