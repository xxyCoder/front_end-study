const uri = "http://localhost:8080/q=中秋";

console.log(encodeURI(uri))

console.log(encodeURIComponent(uri))

// URL除了字符串也可以是另一个URL实例，此时URL会自动读取该实例的href属性
const url1 = new URL("http://localhost:8080/index.html")
console.log(url1.href)
// 如果第一个参数是相对路径，那么需要第二个参数表示绝对路径
const url2 = new URL("index.html", "http://localhost:8080")
console.log(url2.href)
const url3 = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');
console.log(url3.username, url3.password)