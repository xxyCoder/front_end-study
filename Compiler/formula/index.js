const parser = require('./parser')
const evaluate = require('./evaluate')
const sourceCode = "(2-1)*3*(2+2)";
const ast = parser(sourceCode);

console.log(JSON.stringify(ast, null, 2));

const result = evaluate(ast);
console.log(result);