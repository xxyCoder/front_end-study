const { UglifyJSPlugin } = require('webpack')
const UglifyESPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    plugins: [
        // 压缩JS
        new UglifyJSPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true
            },
            output: {
                beautify: true,
                comments: true
            }
        }),
        // 压缩ES6
        new UglifyESPlugin({
            uglifyOptions: {
                warnings: true,
                drop_console: true
            },
            output: {
                beautify: true,
                comments: true
            }
        })
    ],
    optimization: {
        minimizer: [
            // 压缩CSS
            new CssMinimizerPlugin()
        ]
    }
}