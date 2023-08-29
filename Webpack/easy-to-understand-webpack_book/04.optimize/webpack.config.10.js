const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
    plugins: [
        // 开启 Scope Hoisting
        new ModuleConcatenationPlugin()
    ]
}