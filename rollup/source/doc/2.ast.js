const acorn = require('acorn');

// parse将源代码转换成抽象语法树
const ast = acorn.parse(`const name = 'xxyCoder';`);
console.log(ast)
// 