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

// 异步遍历器
function makeAsyncIterator(array) {
  let index = 0, n = array.length;
  return {
    next() {
      return index < n ?
        new Promise((resolve) => resolve({ value: array[index++], done: false })) :
        new Promise(resolve => resolve({ value: undefined, done: true }))
    }
  }
}

const ait = makeAsyncIterator([1, 2, 3, 4]);
ait.next().then(console.log)
ait.next().then(console.log)
ait.next().then(console.log)
ait.next().then(console.log)
ait.next().then(console.log)

const asyncObj = {
  name: "xxy",
  age: 21,
  [Symbol.asyncIterator]() {
    const keys = Object.getOwnPropertyNames(asyncObj), n = keys.length;
    let idx = 0;
    return {
      next() {
        return idx < n ?
          new Promise(resolve => setTimeout(resolve({ value: asyncObj[keys[idx++]], done: false }))):
          new Promise((resolve => setTimeout(resolve({ value: undefined, done: true }))))
      }
    }
  }
}
async function af() {
  for await (const p of asyncObj) {
    console.log(p)
  }
}
af()

async function *agen() {
  console.log('----', 1)
  yield 'hello';
  yield new Promise(resolve => {
    setTimeout(resolve(111), 1000)
  });
  console.log('----', 2)
  yield 'world'
}

const ag = agen();
ag.next().then(console.log);
ag.next().then(console.log);
ag.next().then(console.log);
ag.next().then(console.log);