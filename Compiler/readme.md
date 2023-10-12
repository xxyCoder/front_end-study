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

## 转换
- 对AST进行一些修改或者翻译成新语言

## 代码生成
- 这个阶段所做和转换重叠，但代码主要部分还是根据AST来输出代码