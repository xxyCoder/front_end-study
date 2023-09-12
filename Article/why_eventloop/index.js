function print(message) {
    console.log(message);
}

print("main");

new Promise((resolve) => {
    console.log("promise no timer");
    resolve("promise then no timer");
})
    .then(print)

new Promise((resolve) => {
    setTimeout(() => {
        console.log("promise has timer");
        resolve("promise then has timer");
    })
})
    .then(print)

process.nextTick(() => {
    console.log("nextTick");
})

setTimeout(print, 0, "setTimeout time 0");
setTimeout(() => {
    print("setTimeout time 1000");
    new Promise(res => {
        console.log("timeout promise")
        res("timeout promise then")
    }).then(print);
}, 1000)
setInterval(print, 5000, "interval");
setImmediate(print, 0, "immediate")