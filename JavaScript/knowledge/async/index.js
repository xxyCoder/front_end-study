console.log(1);
async function A() {
  const res = await 1;
  console.log(res, 'res');
  return res;
}

A()
.then((res) => {
  console.log(res, 'then')
})

console.log(2);

// 实现原理
function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(err) {
        return reject(err);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value)
        .then((v) => {
          step(function() { return gen.next(v) });
        })
        .catch((e) => {
          step(function() { return gen.throw(e) });
        })
    }
    step(function() { return gen.next() });
  });
}