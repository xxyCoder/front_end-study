const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
    plugins: [
        new DefinePlugin({
            // 定义环境变量为production
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}