// 分词
const NUMBER = /[0-9]/;

const tokens = [];
/**
 * start表示开始函数
 * 接收一个字符，返回下一个状态函数
 */
let currentToken;
function start(char) {
    if (NUMBER.test(char)) {
        currentToken = { type: "Numeric", value: '' };
    }
    return number(char);
}

function number(char) {
    if (NUMBER.test(char)) {
        currentToken.value += char;
        return number;
    } else if (char === '+' || char === '-') {
        emit(currentToken);
        emit({ type: "Punctuator", value: char });
        currentToken = { type: "Numeric", value: '' };
        return number;
    }
}

function emit(token) {
    tokens.push(token);
    currentToken = {};
}

function tokenizer(input) {
    let state = start;
    for (let char of input) {
        state = state(char);
    }
    if (currentToken.value.length > 0) {
        emit(currentToken)
    }
}

tokenizer("10+20+30-10");
console.log("token", tokens);