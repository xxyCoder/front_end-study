require.ensure(["./require-async.js"], function() {
  const m = require("./require-async.js");
  console.log("end2", m)
})
console.log("a.js")

function add(a, b) {
  return a + b;
}

module.exports = {
  add
}