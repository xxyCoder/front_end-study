function makeIterator(array) {
  let nextIndex = 0
  return {
    next() { // 对于遍历器对象来说，done: false和value: undefined可以省略
      return nextIndex < array.length ?
        { value: array[nextIndex++], done: false } :
        { value: undefined, done: true }
    }
  }
}

function* gn() {
  console.log('start')
  let x = yield 1
  console.log(x)
  x = yield 2
  if (!x) console.log('for...of遇见done为true就退出循环不会继续执行循环体内容')
  return 3
}
const g = gn()
console.log(g.next(444))
console.log(g.next(555))
console.log(g.next(666))

for (const x of gn()) {
  console.log(x)
}

function* tgn() {
  try {
    yield
  } catch (e) {
    console.log('inner:', e)
  }
}
const tg = tgn()
tg.next()
try {
  tg.throw("a")
  tg.throw("b")
} catch (e) {
  console.log("outer:", e)
}

function* numbers() {
  yield 1
  try {
    yield 2
    yield 3
  } finally {
    yield 4
    yield 5
  }
  console.log('here')
  yield 6
  return 10
}
console.log('------')
const g2 = numbers()
console.log(g2.next()) // { value: 1, done: false }
console.log(g2.next()) // { value: 2, done: false }
console.log(g2.return(7)) // { value: 4, done: false }
console.log(g2.next()) // { value: 5, done: false }
console.log(g2.next()) // { value: 7, done: true }

function* star() {
  console.log(this === globalThis)
  yield 'start';
  const x = yield* numbers(); // 接受return值
  console.log(x)
  yield 'end';
}
for (const x of star()) {
  console.log(x)
}

// 让generator函数返回一个正常对象，既能使用next方法又可以获得正常的this
function *F() {
  yield this.x = 2;
  yield this.y = 3;
}
const obj = {};
let f = F.call(obj);
f.next()
f.next()
f.next()
console.log(obj)

// 统一写法
f = F.call(F.prototype);
f.next();
f.next();
f.next();
console.log(f.x, f.y)

// 部署iterator接口
function *iterEntries(obj) {
  const keys = Object.keys(obj);
  for (let i = 0, n = keys.length; i < n; ++i) {
    const key = keys[i];
    yield [key, obj[key]];
  }
}

for (let [key, value] of iterEntries(obj)) {
  console.log(key, value);
}