const Compiler = require("./compiler");

function webpack(options) {
    // step1: 初始化参数，根据配置文件和shell参数合成参数
    const mergeOptions = _mergeOptions(options);
    // 创建compiler对象
    const compiler = new Compiler(mergeOptions);
    // 加载插件
    _loadPlugin(options.plugins, compiler);
    return compiler;
}

// 合并参数
function _mergeOptions(options) {
    // ex: --mode=production
    const shellOptions = process.argv.slice(2).reduce((option, argv) => {
        const [key, value] = argv.split('=');
        if (key && value) {
            // ex: --mode=production --devtool=false
            const parseKey = key.slice(2);
            option[parseKey] = value;
        }
        return option;
    }, {});
    return { ...options, ...shellOptions }
}
// 加载插件
function _loadPlugin(plugins, compiler) {
    if (plugins && Array.isArray(plugins)) {
        plugins.forEach((plugin) => {
            plugin.apply(compiler);
        })
    }
}

module.exports = webpack;