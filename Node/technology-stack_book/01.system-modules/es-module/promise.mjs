const sleep = (value, ms) => new Promise(resolve => setTimeout(() => resolve(value), ms));

export const hello = await sleep("hello", 1000);
export const node = await sleep("node", 2000);
export default function () {
    console.log("promise.mjs")
}