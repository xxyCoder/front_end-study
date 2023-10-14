const tokenize = require('./tokenizer');
const toAST = require('./toAST')

// 将代码转换为抽象语法树
function parse(script) {
    // 把代码分词处理
    const tokenReader = tokenize(script);
    // 转换为语法树
    const ast = toAST(tokenReader);
    return ast;
}

module.exports = parse;