const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
    plugins: [
        new ParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    // 紧凑输出
                    beautify: false,
                    // 删除注释
                    comments: false
                },
                compress: {
                    // 删除没用代码是否警告
                    warning: false,
                    // 删除所有console语句
                    drop_console: true,
                    // 内嵌定义了但是只使用一次的变量
                    collapse_vars: true,
                }
            }
        })
    ]
}