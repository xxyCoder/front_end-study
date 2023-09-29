// 接受一个整数表示二进制数据占多少字节
const buffer = new ArrayBuffer(8)
console.log(buffer.byteLength)

// Blob对象
const htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
const obj = { "hi": "hello" }
// 保存为text
const myBlob = new Blob(htmlFragment, { type: "text/html" })
// 保存为json
const myBlob2 = new Blob([JSON.stringify(obj)], { type: "application/json" })
// 实例属性 size和type,返回数据大小和属性
console.log(myBlob, myBlob.size, myBlob.type)
console.log(myBlob2, myBlob2.size, myBlob2.type)
