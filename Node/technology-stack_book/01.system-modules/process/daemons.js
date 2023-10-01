const spawn = require('child_process').spawn;

function start() {
    const daemon = spawn("node", ['deamon.js'], {
        detached: true,  // 使得子进程在父进程退出后可以继续运行
        stdio: 'ignore'
    });

    console.log("守护进程开启  父进程 pid: %s ,守卫进程pid: %s", process.pid, daemon.pid);
    daemon.unref(); // 退出父进程
}

start();