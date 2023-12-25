function ALoader(content) {
  console.log("loader a normal");
  return String(content)
}

ALoader.pitch = function() {
  console.log("loader a pitching")
  return "xxy"
}

module.exports = ALoader;