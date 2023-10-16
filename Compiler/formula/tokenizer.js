const RegExObject = /([0-9]+)|(\+)|(\*)|(\-)|(\/)|(\()|(\))/g;
const tokenTypes = require('./tokenTypes');
const tokenNames = [
    tokenTypes.NUMBER, tokenTypes.PLUS, tokenTypes.MULTIPLY,
    tokenTypes.MINUS, tokenTypes.DIVISION, tokenTypes.LEFT_PARA,
    tokenTypes.RIGHT_PARA
];

function* tokenizer(script) {
    while (true) {
        const result = RegExObject.exec(script);
        if (!result) break;
        const index = result.findIndex((item, index) => index > 0 && !!item);

        const token = { type: "", value: "" };
        token.type = tokenNames[index - 1];
        token.value = result[0];
        yield token;
    }
}

class TokenReader {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }
    // 消耗一个token
    read() {
        if (this.pos < this.tokens.length) {
            return this.tokens[this.pos++];
        }
        return null;
    }
    // 预读下一个，但是不消耗
    peak() {
        if (this.pos < this.tokens.length) {
            return this.tokens[this.pos];
        }
        return null;
    }
    // 倒退
    unread() {
        if (this.pos > 0) {
            --this.pos;
        }
    }
}

function tokenize(script) {
    const tokens = [];
    for (let token of tokenizer(script)) {
        tokens.push(token);
    }
    return new TokenReader(tokens);
}

module.exports = tokenize