const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

const sourceCode = 'function a() {}';
// 将源代码转换成ast抽象语法树
const ast = esprima.parseScript(sourceCode);
estraverse.traverse(ast, {
    enter(node) {
        console.log("enter:", node.type);
    },
    leave(node) {
        console.log("leave:", node.type);
    }
})

console.log(escodegen.generate(ast));