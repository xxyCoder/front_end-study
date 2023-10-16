const ASTNode = require('./ASTNode');
const nodeTypes = require('./nodeTypes');
const tokenTypes = require('./tokenTypes');

/**
 * 递归下降
 * add -> minus|minus + add
 * minus -> multiple|multiple - minus
 * multiple -> primary|primary * multiple
 * primary -> number|(add)
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

function primary(tokenReader) {
    let node = number(tokenReader);
    if (!node) {
        let token = tokenReader.peak();
        if (token !== null && token.type === tokenTypes.LEFT_PARA) {
            tokenReader.read();
            node = additive(tokenReader);
            tokenReader.read();
        }
    }
    return node;
}

function multiply(tokenReader) {
    const child1 = primary(tokenReader);
    let node = child1;
    let token = tokenReader.peak();
    if (child1 !== null && token !== null) {
        if (token.type === tokenTypes.MULTIPLY || token.type === tokenTypes.DIVISION) {
            token = tokenReader.read();
            let child2 = multiply(tokenReader);
            if (child2 !== null) {
                node = new ASTNode(token.type === tokenTypes.MULTIPLY ? nodeTypes.Multiplicative : nodeTypes.Divide);
                node.appendChild(child1);
                node.appendChild(child2);
            }
        }
    }
    return node;
}

function minus(tokenReader) {
    let child1 = multiply(tokenReader);
    let node = child1;
    let token = tokenReader.peak();
    if (child1 !== null && token !== null) {
        if (token.type === tokenTypes.MINUS) {
            token = tokenReader.read();
            let child2 = minus(tokenReader);
            if (child2 !== null) {
                node = new ASTNode(nodeTypes.Minus);
                node.appendChild(child1);
                node.appendChild(child2);
            }
        }
    }
    return node;
}

function additive(tokenReader) {
    const child1 = minus(tokenReader);
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