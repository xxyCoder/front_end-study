const { program } = require("commander")

// 跟着--help 会输出信息
program
  .version('1.0.0')
  .description("a test")
  .option('-u, --username <name>', 'your name')
  .name("test")

// 注册子命令 node index.js user1 触发
program
  .command('use1')
  .action(() => {
    console.log('use use1!')
  })
  
// 解析参数  
program.parse(process.argv)

const { operands } = program.parseOptions(process.argv)

console.log(operands)