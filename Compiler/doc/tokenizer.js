const esprima = require('esprima');
const estraverse = require('estraverse-fb')
const sourceCode = `<h1 id="title"><span>hello</span> world</h1>`;

const ast = esprima.parseModule(sourceCode, { jsx: true, tokens: true });
// console.log(ast);

let indent = 0;
function padding() {
    return ' '.repeat(indent);
}
estraverse.traverse(ast, {
    enter(node) {
        console.log(padding() + node.type + "进入");
        indent += 2;
    },
    leave(node) {
        console.log(padding() + node.type + "离开");
        indent -= 2;
    }
})