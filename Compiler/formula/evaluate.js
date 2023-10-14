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
            result = 0;
            for (let child of node.children) {
                result += evaluate(child);
            }
            break;
        case nodeTypes.Multiplicative:
            result = 1;
            for (let child of node.children) {
                result *= evaluate(child);
            }
            break;
        case nodeTypes.Numberic:
            result = parseFloat(node.value);
            break;
        default: break;
    }

    return result;
}

module.exports = evaluate;