const { tokenizer } = require('./tokenizer');
const nodeTypes = require('./nodeTypes');
const tokenTypes = require('./tokenTypes');

/**
 * JSXElement -> <JSXIdentifier attribute*>child*</JSXIdentifier>
 * attribute -> AttributeKey="ArrtibuteValue"
 * child -> JSXElement|JSXText
 */

function parse(sourceCode) {
    let tokens = tokenizer(sourceCode);
    let pos = 0;
    function walk(parent) {
        let token = tokens[pos];
        let nextToken = tokens[pos + 1];
        debugger;
        // JSXElement -> <JSXIdentifier attribute*>child*</JSXIdentifier>
        if (token.type === tokenTypes.LeftParenthese && nextToken.type === tokenTypes.Identifier) { // 开始符号
            const node = {
                type: nodeTypes.JSXElement,
                openingElement: null,
                closingElement: null,
                children: []
            };
            token = tokens[++pos];
            node.openingElement = {
                type: nodeTypes.JSXOpeningElement,
                name: {
                    type: nodeTypes.JSXIdentifier,
                    name: token.value
                },
                attributes: []
            };
            token = tokens[++pos];
            while (token.type === tokenTypes.AttributeKey) {
                node.openingElement.attributes.push(walk());
                token = tokens[pos];
            }
            token = tokens[++pos];
            nextToken = tokens[pos + 1];
            // child -> JSXElement|JSXText
            while (token.type !== tokenTypes.LeftParenthese || nextToken.type !== tokenTypes.BackSlash) {
                node.children.push(walk());
                token = tokens[pos];
                nextToken = tokens[pos + 1];
            }
            node.closingElement = walk(node);
            return node;
        } else if (token.type === tokenTypes.AttributeKey) {
            // attribute -> AttributeKey="ArrtibuteValue"
            let nextToken = tokens[++pos];
            const node = {
                type: nodeTypes.JSXAttribute,
                name: {
                    type: nodeTypes.JSXIdentifier,
                    name: token.value
                },
                value: {
                    type: nodeTypes.Literal,
                    value: nextToken.value
                }
            };
            ++pos;
            return node;
        } else if (token.type === tokenTypes.Text) {
            ++pos;
            return {
                type: nodeTypes.Text,
                value: token.value
            };
        } else if (parent && token.type === tokenTypes.LeftParenthese && nextToken.type === tokenTypes.BackSlash) {
            ++pos; // <
            ++pos; // /
            token = tokens[pos];
            ++pos; // element
            ++pos; // >
            if(parent.openingElement.name.name !== token.value) {
                throw new Error(`开始${parent.openingElement.name.name}和结束标签${token.value}不匹配`);
            }
            return {
                type: nodeTypes.JSXClosingElemennt,
                name: {
                    type: nodeTypes.JSXIdentifier,
                    name: token.value
                }
            }
        }
        throw new Error("不合法字符");
    }
    const ast = {
        type: nodeTypes.Program,
        body: [
            {
                type: nodeTypes.ExpressionStatement,
                expression: walk()
            }
        ]
    }
    return ast;
}

const sourceCode = `<h1 id="title"><span>hello</span> world</h1>`;
console.log(JSON.stringify(parse(sourceCode), null, 2));

module.exports = {
    parse
};