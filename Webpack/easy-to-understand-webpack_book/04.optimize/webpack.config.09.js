const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: {
        base: './base'
    },
    plugins: [
        new CommonsChunkPlugin({
            // 从那些chunk中提取
            chunks: ['a', 'b'],
            // 形成的新名字
            name: "common"
        }),
        new CommonsChunkPlugin({
            chunks: ["common", "base"],
            name: "base"
        })
    ]
}