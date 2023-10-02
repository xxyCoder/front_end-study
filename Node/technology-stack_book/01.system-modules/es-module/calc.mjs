export function add(a, b) {
    return a + b;
}

console.log("calc.mjs", this)

export let a = 2;

setTimeout(() => {
    a = 3;
}, 5000)