function travers(ast, visitor) {
  function traverseNode(node) {
    const { tagName, childNodes } = node
    const method = visitor[tagName]
    if (typeof method === 'function') {
      method(node)
    }
    if (!childNodes) return
    for (const child of childNodes) {
      traverseNode(child,)
    }
  }

  traverseNode(ast, null)
}

module.exports = travers