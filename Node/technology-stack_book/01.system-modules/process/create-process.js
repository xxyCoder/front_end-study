// 进程创建
const child_process = require('child_process');
const { stdout, stderr } = require('process');
// 方法一   适用于返回大量数据
const spawn = child_process.spawn;
// const child = spawn('ls', ['-l'], { cwd: process.cwd() })
// child.stdout.pipe(process.stdout);
// console.log(process.pid, child.pid)
// 方法二   适用于小量数据
const exec = child_process.exec;
// exec("node -v", (err, stdout, stderr) => {
//     console.log(err, stdout, stderr);
// })
// 方法三   类似exec，不支持IO重定向和文件查找这类行为
const execFile = child_process.execFile;
// execFile(`node`, ['-v'], (error, stdout, stderr) => {
//     console.log({ error, stdout, stderr })
// })
// 方法四   衍生新进程，进程之间相互独立
const fork = child_process.fork;
const c = fork('./index.js')
// 发送数据
c.send("开启新进程");
// 接收数据
c.on("message", data => {
    console.log(data)
})
// 关闭
c.on("close", (code, signal) => {
    console.log(code, signal);
    c.kill();
})