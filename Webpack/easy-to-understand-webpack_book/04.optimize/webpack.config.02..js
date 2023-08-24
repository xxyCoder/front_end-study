const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

// 构建动态链接库
module.export = {
    entry: {
        react: ['react', 'react-dom'],
        polyfill: ['core-js/fn/object/assign', 'core-js/fn/promise', 'whatwg-fetch']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
    },
    plugins: [
        new DllPlugin({
            // name需要和output.library保持一致
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}

// 使用动态链接库
module.exports = {
    entry: {
        main: './main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    plugins: [
        new DllReferencePlugin({
            manifest: require('./dist/polyfill.manifest.json')
        })
    ]
}