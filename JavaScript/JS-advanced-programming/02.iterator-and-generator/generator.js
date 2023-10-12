function* generatorFn(args) {
    console.log("start", args);
    const x = yield new Promise((resolve) => {
        setTimeout(() => {
            console.log("resolve")
            resolve();
        }, 0);
    })
    console.log("x:", x);
    yield new Error(x);
    let y;
    try {
        y = yield x
    } catch (err) {
        console.log("err");
    }
    console.log("y:", y);
    return "end";
}

const gen = generatorFn("xxyCoder");
console.log(gen.next());
console.log(gen.next("xxx"))
console.log(gen.next())
console.log(gen.throw("yyy"))

function* generatorStrongFn() {
    console.log("strong")
    yield* [1, 2, 3, [5, 6]];
    yield* [7, 8, 9];
    return 10;
}
const gens = generatorStrongFn();
for (const x of gens) {
    console.log(x)
}