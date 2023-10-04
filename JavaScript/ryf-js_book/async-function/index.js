async function f() {
    await new Promise((resolve, reject) => {
        resolve("success");
    })
    try {
        await new Promise(function (resolve, reject) {
            throw new Error("error");
        });
        console.log("continue");
        await new Promise((resolve, reject) => {
            reject("fail");
        })
    } catch (e) {
        console.log("catch error");
    }

    return new Promise((resolve) => {
        resolve("end");
    })
}

f().then(console.log).catch((v) => {
    console.log("error", v);
});
// 实现原理
function spawn(genF) {
    return new Promise((resolve, reject) => {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (err) {
                reject(err);
                return;
            }

            if (next.done) {
                resolve(next.value);
                return;
            }
            Promise
                .resolve(next.value)
                .then((value) => {
                    step(() => gen.next(value));
                })
        }
        step(() => gen.next(undefined));
    });
}