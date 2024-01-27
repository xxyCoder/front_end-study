const parseHTML = require("./ast/parse")
const travers = require("./ast/travers")

function loader(content) {
  const ast = parseHTML(content)
  
  let res = 
`   function createNode({ tagName, attrs, childNodes, type, value }) {
      if (type === 'text') {
        return document.createTextNode(value)
      }
      const node = document.createElement(tagName);
      for (const attr of attrs) {
        const { name, value } = attr;
        node.setAttribute(name, value);
      }
      for (const child of childNodes) {
        const ch = createNode(child);
        node.append(ch);
      }
      return node;
    }\n`

  travers(ast, {
    html({ childNodes }) {
      for (const child of childNodes) {
        const { tagName } = child;
        res += `var ch = createNode(${JSON.stringify(child)});\ndocument.${tagName} = ch;`
      }
    }
  })
  return res
}

module.exports = loader