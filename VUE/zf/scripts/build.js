// 把packages目录下所有包都进行打包
const fs = require('fs');
const execa = require('execa'); // 开启子进行，使用rollup打包
const target = fs.readdirSync("packages").filter(file => fs.statSync(`packages/${file}`).isDirectory());

async function build(target) {
    await execa("rollup", ["-c", "--environment", `TARGET:${target}`], { stdio: "inherit" });
}

function runParallel(targets, iteratorFn) {
    const res = [];
    for (const item of targets) {
        const p = iteratorFn(item);
        res.push(p);
    }
    return Promise.all(res);
}

runParallel(target, build)