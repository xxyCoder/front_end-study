class PluginB {
    apply(compiler) {
        compiler.hooks.run.tap('Plugin B', () => {
            // 调用
            console.log('PluginB')
        })
    }
}

module.exports = PluginB;