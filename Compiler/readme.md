# 编译原理

## 解析
- 词法分析：接收原代码，然后将其分割成一些token（数组，由一些代码语句的碎片组成）
  - ex:
    ```js
    tokens: [
        { type: 'Punctuator', value: '<' },
        { type: 'JSXIdentifier', value: 'h1' },
        { type: 'JSXIdentifier', value: 'id' },
        { type: 'Punctuator', value: '=' },
        { type: 'String', value: '"title"' },
        { type: 'Punctuator', value: '>' },
        { type: 'Punctuator', value: '<' },
        { type: 'JSXIdentifier', value: 'span' },
        { type: 'Punctuator', value: '>' },
        { type: 'JSXText', value: 'hello' },
        { type: 'Punctuator', value: '<' },
        { type: 'Punctuator', value: '/' },
        { type: 'JSXIdentifier', value: 'span' },
        { type: 'Punctuator', value: '>' },
        { type: 'JSXText', value: ' world' },
        { type: 'Punctuator', value: '<' },
        { type: 'Punctuator', value: '/' },
        { type: 'JSXIdentifier', value: 'h1' },
        { type: 'Punctuator', value: '>' }
    ]
    ```
- 语法分析：接收之前的token，转换成抽象的表示，这种抽象的表示描述了代码语句中的每一个片段以及它们之间的关系，称之为抽象语法树
  - 递归下降算法
    - 左边非终结符，右边是产生式
    - 语法解析过程，左边被右边替代，不断替代知道左边为终结符
    - 只有终结符才可以是AST的叶子节点
  - 上下文无关文法
    - 无论在任何情况，文法的推到规则都是一样的
    - 优先级高的作为子节点，优先级低的作为父节点

## 转换
- 对AST进行一些修改或者翻译成新语言

## 代码生成
- 这个阶段所做和转换重叠，但代码主要部分还是根据AST来输出代码