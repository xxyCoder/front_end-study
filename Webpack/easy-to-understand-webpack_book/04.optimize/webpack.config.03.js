const path = require('fs');
const HappyPack = require('happypack');
// 构造出共享进程池，进程池中包含5个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                // 把js文件处理交给id为babel的HappyPack处理
                use: ['happypack/loader?id=babel'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                // 把css文件处理交给id为css的HappyPack处理
                use: ['happypack/loader?id=css']
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: "babel",
            loaders: ['babel-loader'],
            // 开启几个子进程去处理这一类型的文件
            threads: 6
        }),
        new HappyPack({
            id: "css",
            loaders: ['css-loader'],
            threadPool: happyThreadPool
        })
    ]
}