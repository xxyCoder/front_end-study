const { ATTRIKEY, ATTRIVAL, BS, ID, LAB, RAB, TEXT } = require('./constant.js')
const CHAR = /[a-zA-Z0-9\-:'";]/

class Tokenizer {
  constructor(input) {
    this.input = input
    this.tokens = []
    this.curToken = { type: '', value: '' }
    this.startSymbol = undefined
  }
  start(char) {
    if (char === '<') {
      this.emit({ type: LAB, value: '<' })
      return this.leftAngleBck.bind(this)
    }
  }
  emit(token) {
    token.value && this.tokens.push(token)
    this.curToken = { type: '', value: '' }
  }
  leftAngleBck(c) { // 处理上一个状态是左尖括号
    if (CHAR.test(c)) { // <nodeName
      this.curToken.type = ID
      this.curToken.value = c
      return this.identifier.bind(this)
    } else if (c === '/') { // </nodeName
      this.emit({ type: BS, value: '/' })
      return this.identifier.bind(this)
    }
  }
  rightAngleBck(c) {
    if (c === '<') { // ><nodeName
      this.emit({ type: LAB, value: '<' })
      return this.leftAngleBck.bind(this)
    } else { // >.....
      this.curToken.type = TEXT
      this.curToken.value = c
      return this.text.bind(this)
    }
  }
  text(c) {
    if (c === '<') {
      this.emit(this.curToken)
      this.emit({ type: LAB, value: '<' })
      return this.leftAngleBck.bind(this)
    } else {
      this.curToken.value += c
      return this.text.bind(this)
    }
  }
  identifier(c) {
    if (CHAR.test(c)) {
      this.curToken.type = ID
      this.curToken.value += c
      return this.identifier.bind(this)
    } else if (c === ' ') { // <nodeName nodeKey=nodeValue
      this.emit(this.curToken)
      return this.attributeKey.bind(this)
    } else if (c === '/') { // nodeName/>
      this.emit(this.curToken)
      this.emit({ type: BS, value: '/' })
      return this.identifier.bind(this)
    } else if (c === '>') { // nodeName/> or nodeName>
      this.emit(this.curToken)
      this.emit({ type: RAB, value: '>' })
      return this.rightAngleBck.bind(this)
    }
  }
  attributeKey(c) {
    if (CHAR.test(c)) {
      this.curToken.type = ATTRIKEY
      this.curToken.value += c
      return this.attributeKey.bind(this)
    } else if (c === '=') {
      this.emit(this.curToken)
      return this.attributeStart.bind(this)
    }
  }
  attributeStart(c) {
    if (c === '"' || c === "'") {
      this.curToken.type = ATTRIVAL
      this.curToken.value = ''
      this.startSymbol = c
      return this.attributeVal.bind(this)
    }
  }
  attributeVal(c) {
    if (c === this.startSymbol) {
      this.emit(this.curToken)
      this.startSymbol = undefined
      return this.identifier.bind(this)
    } else if (CHAR.test(c)) {
      this.curToken.type = ATTRIVAL
      this.curToken.value += c
      return this.attributeVal.bind(this)
    }
  }
  EOF() {
    this.emit(this.curToken)
  }
  tokenize() {
    let state = this.start.bind(this), input = this.input
    for (const c of input) {
      state = state(c)
    }
    this.EOF()
    return this.tokens
  }
}

module.exports = Tokenizer