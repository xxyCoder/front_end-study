import b from './b.mjs'

console.log("a:", b);

const a = "A";

export let obj = {
    x: {
        name: "xxyCoder"
    }
}

export function print() {
    console.log("a.mjs");
}

export default a;
setTimeout(() => {
    obj = {
        x: {
            name: "xxy"
        }
    }
}, 5000);
