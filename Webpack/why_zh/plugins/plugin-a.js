class PluginA {
    apply(compiler) {
        compiler.hooks.run.tap('Plugin A', () => {
            // 调用
            console.log('PluginA')
        })
    }
}

module.exports = PluginA;