const ASTNode = require('./ASTNode');
const nodeTypes = require('./nodeTypes');
const tokenTypes = require('./tokenTypes');

/**
 * 递归下降
 * add -> multiple|multiple + add
 * multiple -> number|number * multiple
 */

function number(tokenReader) {
    let node = null;
    let token = tokenReader.peak();
    if (token !== null && token.type === tokenTypes.NUMBER) {
        token = tokenReader.read();
        node = new ASTNode(nodeTypes.Numberic, token.value);
    }
    return node;
}

function multiply(tokenReader) {
    const child1 = number(tokenReader);
    let node = child1;
    let token = tokenReader.peak();
    if (child1 !== null && token !== null) {
        if (token.type === tokenTypes.MULTIPLY) {
            token = tokenReader.read();
            let child2 = multiply(tokenReader);
            if (child2 !== null) {
                node = new ASTNode(nodeTypes.Multiplicative);
                node.appendChild(child1);
                node.appendChild(child2);
            }
        }
    }
    return node;
}

function additive(tokenReader) {
    const child1 = multiply(tokenReader);
    let node = child1;
    let token = tokenReader.peak();
    if (child1 !== null && token !== null) {
        if (token.type === tokenTypes.PLUS) {
            token = tokenReader.read();
            let child2 = additive(tokenReader);
            if (child2 !== null) {
                node = new ASTNode(nodeTypes.Additive);
                node.appendChild(child1);
                node.appendChild(child2);
            }
        }
    }
    return node;
}

function toAST(tokenReader) {
    const rootNode = new ASTNode(nodeTypes.Program);
    const child = additive(tokenReader);
    if (child) {
        rootNode.appendChild(child);
    }
    return rootNode;
}

module.exports = toAST;