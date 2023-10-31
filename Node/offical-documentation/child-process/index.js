const { spawn } = require('node:child_process');
const ls = spawn('ls', ["-l", "."], { shell: process.platform === 'win32', cwd: process.cwd() });

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr:`, data.toString("ascii"));
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});