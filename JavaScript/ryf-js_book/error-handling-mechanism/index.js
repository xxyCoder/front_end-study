// window.onerror = function (message, source, line, col, error) {
//     console.log(message, source, line, col, error)
// }
window.addEventListener('error', (e) => {
    console.log(`catch ${e.message}`)
})
window.addEventListener('unhandledrejection', (err) => {
    console.log(`catch err ${err}`)
})
new Promise((resolve,reject) => reject('reject'))
// Error实例对象
const err = new Error("出错了")
console.log(err.message)
// SyntaxError对象
// const 1a;   // SyntaxError: Invalid or unexpected token
// console.log("hello" // SyntaxError: missing ) after argument list

// ReferenceError对象
console.log() = 1   // ReferenceError: Invalid left-han side in assignment

// RangeError对象
new Array(-1)   // RangeError: Invalid array length

// TypeError对象
new 123 // TypeError: 123 is not a constructor

