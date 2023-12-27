const Bundle = require('./bundle')

function rollup(entry, outputFilename) {
    // bundle代表打包对象，里面包含所有模块的信息
    const bundle = new Bundle({ entry });
    // 进行编译
    bundle.build(outputFilename);
}

module.exports = rollup