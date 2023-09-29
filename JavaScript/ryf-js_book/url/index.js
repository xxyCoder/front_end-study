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

// URLSearchParams
// 传入字符串
const params1 = new URLSearchParams("?foo=1&bar=2");
// 传入数组
const params2 = new URLSearchParams([["foo", 1], ["bar", 2]]);
// 传入对象
const params3 = new URLSearchParams({ "foo": 1, "bar": 2 })
// 返回实例的字符串形式
console.log(params1.toString())
// 与URL接口结合使用
const url4 = new URL("http://localhost:8080?foo=1&bar=2");
console.log(url4.searchParams.get("foo"))
// 追加查询参数,不会判断该键是否存在,如果已经存在,则添加同名键值
params3.append("baz", 3)
params3.append("baz", 4)
// 该实例有遍历器接口
for (const p of params3) {
    console.log(p[0], ":", p[1]);
}
// 删除指定的查询参数
params3.delete("baz");
console.log(params3.toString())
// 判断是否包含指定的键名
console.log(params3.has("baz"))
// 设置查询字符串的键值,如果键已经存在,那么键值被改写;不存在在追加;如果有多个相同的键值对,则会移除现存的所有与要设置的键同名键值对
params3.set("baz", 3)
params3.append("baz", 4)
params3.append("foo", 11)
console.log(params3.toString())
params3.set("baz", 5)
console.log(params3.toString())
// 拿到键值对与拿到所有键值对
console.log(params3.get("foo"), params3.getAll("foo"))