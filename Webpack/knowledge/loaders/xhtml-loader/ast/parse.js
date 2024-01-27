const { ATTRIKEY, BS, ID, LAB, RAB, TEXT } = require("./constant.js")
const Tokenizer = require("./tokenizer.js")

const selfClosing = ['meta', 'br', 'hr']

function parseHTML(html) {
  const tokenizer = new Tokenizer(html)
  const tokens = tokenizer.tokenize()
  let pos = 0

  const walk = () => {
    const token = tokens[pos]
    if (token.type === LAB) {
      ++pos
      const nxToken = tokens[pos]
      if (nxToken.type === ID) { // <nodeName
        const node = {
          tagName: nxToken.value,
          childNodes: [],
          attrs: []
        }
        ++pos
        while (tokens[pos].type === ATTRIKEY) {
          node.attrs.push({ name: tokens[pos].value, value: tokens[pos + 1].value})
          pos += 2
        }
        if (tokens[pos].type === RAB) { // >
          ++pos
          if (selfClosing.includes(node.tagName)) { // 是自闭合标签
            return node
          } else {
            while (pos < tokens.length) {
              if (tokens[pos].type === LAB && tokens[pos + 1].type === BS) { // </
                pos += 2
                if (tokens[pos].value === node.tagName && tokens[pos + 1].type === RAB) { // </nodeName>
                  pos += 2
                  return node
                }
              } else {
                node.childNodes.push(walk())
              }
            }
          }
        }
      }
    } else if (token.type == TEXT) {
      return tokens[pos++]
    }
  }
  const AST = {
    tagName: '#ducoment',
    childNodes: [walk()]
  }
  return AST
}

module.exports = parseHTML