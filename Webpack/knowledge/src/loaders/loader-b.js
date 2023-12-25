function BLoader(content) {
  console.log("loader b normal");
  return content
}

BLoader.pitch = function() {
  console.log("loader b pitching")
}

module.exports = BLoader;