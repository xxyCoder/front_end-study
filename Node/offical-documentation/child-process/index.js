const { spawn, exec, execFile, fork } = require('child_process');

// 启动一个子进程来执行命令
const ls = spawn('ls', ['-lh', '/usr']);

// 监听子进程的stdout输出
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// 监听子进程的stderr输出
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// 监听子进程的退出事件
ls.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`);
});

// 执行命令并获取输出
exec('ls -lh /usr', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});

// 执行可执行文件并获取输出
execFile('/usr/bin/git', ['--version'], (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});

// 创建一个带有IPC通道的子进程
const child = fork('./child.js');

// 监听子进程发送的消息
child.on('message', (message) => {
    console.log(`收到子进程消息: ${message}`);
});

// 向子进程发送消息
child.send('Hello from parent');