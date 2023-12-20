import("./import-async.js")
.then(() => { console.log("end2") })

console.log("b.js")

function sub(a ,b) {
  return a - b;
}

module.exports = {
  sub
}