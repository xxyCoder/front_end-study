const { parse } = require('./parse');
const { traverse } = require('./traverse');
const nodeTypes = require('./nodeTypes');
// const t = require('@babel/types');

class t {
    static nullLiteral() {
        return { type: nodeTypes.NullLiteral };
    }
    static isJSXElement(node) {
        console.log(node);
        return node.type === nodeTypes.JSXElement
    }
    static isJSXText(node) {
        return node.type === nodeTypes.JSXText;
    }
    static stringLiteral(value) {
        return { type: nodeTypes.StringLiteral, value };
    }
    static memberExpression(object, property) {
        return { type: nodeTypes.MemberExpression, object, property };
    }
    static identifier(name) {
        return { type: nodeTypes.JSXIdentifier, name };
    }
    static objectExpression(properties) {
        return { type: nodeTypes.ObjectExpression, properties };
    }
    static property(key, value) {
        return { type: nodeTypes.Property, key, value };
    }
    static callExpression(callee, _arguments) {
        return { type: nodeTypes.CallExpression, callee, arguments: _arguments }
    }
}

function transformer(ast) {
    traverse(ast, {
        JSXOpeningElement: {
            enter: (nodePath, parent) => {
                console.log("进入开始元素", nodePath.node);
            },
            exit: (nodePath, parent) => {
                console.log("离开开始元素", nodePath.node);
            }
        },
        JSXClosingElement(nodePath, parent) {
            console.log("进入结束元素", nodePath.node);
        },
        JSXElement(nodePath, parent) {
            // 传入节点，返回一个方法调用的新节点
            function transformer(node) {
                if (!node) return t.nullLiteral();
                if (t.isJSXElement(node)) {
                    const memberExpression = t.memberExpression(
                        t.identifier("React"),
                        t.identifier("createElement")
                    );
                    const _arguments = [];
                    const elementType = t.stringLiteral(node.openingElement.name);
                    const attributes = node.openingElement.attributes
                    const objectExpression = attributes.length > 0
                        ? t.objectExpression(attributes.map(attr => t.property(t.identifier(attr.name.name), t.stringLiteral(attr.value.value))))
                        : t.nullLiteral;

                    _arguments.push(elementType, objectExpression, node.children.map(child => transformer(child)));
                    return t.callExpression(memberExpression, _arguments);
                } else if (t.isJSXText(nodePath.node)) {
                    return t.stringLiteral(node.value);
                }
            }
            let newNode = transformer(nodePath.node);
            nodePath.replaceWith(newNode);
        }
    })
}

module.exports = {
    transformer
}

const sourceCode = `<h1 id="title"><span>hello</span> world</h1>`;

const ast = parse(sourceCode);
transformer(ast);
console.log(JSON.stringify(ast, null, 2));