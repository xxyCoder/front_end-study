import("./import-async.js").then(() => { console.log("end2") })

console.log("b.js")

export function sub(a ,b) {
  return a - b;
}

export function mul(a ,b) {
  return a * b;
}