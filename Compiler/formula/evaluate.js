const nodeTypes = require('./nodeTypes')

function evaluate(node) {
    let result;
    switch (node.type) {
        case nodeTypes.Program:
            for (let child of node.children) {
                result = evaluate(child);
            }
            break;
        case nodeTypes.Additive:
            result = evaluate(node.children[0]) + evaluate(node.children[1]);
            break;
        case nodeTypes.Multiplicative:
            result = evaluate(node.children[0]) * evaluate(node.children[1]);
            break;
        case nodeTypes.Minus:
            result = evaluate(node.children[0]) - evaluate(node.children[1]);
            break;
        case nodeTypes.Divide:
            result = evaluate(node.children[0]) / evaluate(node.children[1]);
            break;
        case nodeTypes.Numberic:
            result = parseFloat(node.value);
            break;
        default: break;
    }
    return result;
}

module.exports = evaluate;