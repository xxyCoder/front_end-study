const webpack = require('./webpack');
const config = require('../example/webpack.config');
// step2: 调用webpack初始化compiler对象
const compiler = webpack(config);

// 调用run方法进行打包
compiler.run((err, stats) => {
    if (err) {
        console.log("err", err)
    }
})