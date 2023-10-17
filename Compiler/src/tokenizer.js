const tokenTypes = require('./tokenTypes');
const LETTERS = /[a-zA-Z1-9]/;
let currentToken = { type: '', value: '' };
const tokens = [];

function emit(token) {
    tokens.push(token);
    currentToken = { type: '', value: '' };
}

function start(char) {
    if (char === '<') {
        emit({ type: tokenTypes.LeftParenthese, value: "<" });
        return foundLeftParentheses;
    }
    throw new Error("第一个字符必须是'<'");
}

function foundLeftParentheses(char) {
    if (LETTERS.test(char)) {
        currentToken.type = tokenTypes.Identifier;
        currentToken.value += char;
        return identifer;
    } else if (char === '/') {
        emit({ type: tokenTypes.BackSlash, value: "/" });
        return foundLeftParentheses;
    }
}

function identifer(char) {
    if (LETTERS.test(char)) {
        currentToken.value += char;
        return identifer;
    } else if (char === ' ') {
        emit(currentToken);
        return attribute;
    } else if (char === '>') {
        emit(currentToken);
        emit({ type: tokenTypes.RightParentheses, value: ">" });
        return foundRightParentheses;
    }
}

function attribute(char) {
    if (LETTERS.test(char)) {
        currentToken.type = tokenTypes.AttributeKey;
        currentToken.value += char;
        return attributeKey;
    }
    throw new Error("空格后面不是属性名");
}

function attributeKey(char) {
    if (LETTERS.test(char)) {
        currentToken.value += char;
        return attributeKey;
    } else if (char === '=') {
        emit(currentToken);
        return attributeValue;
    }
}

function attributeValue(char) {
    if (char === '"' || char === "'") {
        currentToken.type = tokenTypes.AttributeValue;
        currentToken.value = "";
        return attributeStringValue;
    }
    throw new Error("属性值没有用用引号包裹")
}

function attributeStringValue(char) {
    if (LETTERS.test(char)) {
        currentToken.value += char;
        return attributeStringValue;
    } else if (char === '"' || char === "'") {
        emit(currentToken);
        return tryLeaveAttribute;
    }
}

function tryLeaveAttribute(char) {
    if (char === ' ') { // 说明后面是新属性
        return attribute;
    } else if (char === '>') {
        emit({ type: tokenTypes.RightParentheses, value: ">" });
        return foundRightParentheses;
    } else {
        throw new Error("Error");
    }
}

function foundRightParentheses(char) {
    if (char === '<') {
        emit({ type: tokenTypes.LeftParenthese, value: "<" });
        return foundLeftParentheses;
    } else {
        currentToken.type = tokenTypes.Text;
        currentToken.value += char;
        return text;
    }
}

function text(char) {
    if (char === '<') {
        emit(currentToken);
        emit({ type: tokenTypes.LeftParenthese, value: "<" });
        return foundLeftParentheses;
    } else {
        currentToken.value += char;
        return text;
    }
}

function EOF() {
    if (currentToken.value.length > 0) {
        emit(currentToken);
    }
}

function tokenizer(input) {
    let state = start;
    for (const char of input) {
        state = state(char);
    }
    EOF();
    return tokens;
}

module.exports = {
    tokenizer
}