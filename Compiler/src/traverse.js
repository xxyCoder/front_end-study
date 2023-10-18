const { parse } = require('./parse');
const nodeTypes = require('./nodeTypes');
const sourceCode = `<h1 id="title"><span>hello</span> world</h1>`;

function replace(parent, oldNode, newNode) {
    if (parent) {
        for (const key in parent) {
            if (parent.hasOwnProperty(key)) {
                if (parent[key] === oldNode) {
                    parent[key] = newNode;
                }
            }
        }
    }
}

function traverse(ast, visitor) {

    function traverseArray(array, parent) {
        array.forEach(child => traverseNode(child, parent));
    }

    function traverseNode(node, parent) {
        const replaceWith = replace.bind(null, parent, node);
        const method = visitor[node.type];
        if (method) {
            if (typeof method === 'function') {
                method({ node, replaceWith }, parent);
            } else {
                method.enter({ node, replaceWith }, parent);
            }
        }
        switch (node.type) {
            case nodeTypes.Program:
                traverseArray(node.body, parent);
                break;
            case nodeTypes.ExpressionStatement:
                traverseNode(node.expression, parent);
                break;
            case nodeTypes.JSXElement:
                traverseNode(node.openingElement, node);
                traverseArray(node.children, node);
                traverseNode(node.closingElement, node);
                break;
            case nodeTypes.JSXOpeningElement:
                traverseNode(node.name, node);
                traverseArray(node.attributes, node);
                break;
            case nodeTypes.JSXAttribute:
                traverseNode(node.name, node);
                traverseNode(node.value, node);
                break;
            case nodeTypes.JSXClosingElement:
                traverseNode(node.name, node);
                break;
            default: break;
        }
        if (method && method.exit) {
            method.exit({ node }, parent);
        }
    }

    traverseNode(ast, null);
}

const ast = parse(sourceCode);


module.exports = { traverse }