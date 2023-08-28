const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');

module.exports = {
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://cdn.example.com/[fullhash]/'
    },
    module: {
        rules: [
            {
                // 增加对 CSS 文件的支持
                test: /\.css$/,
                // 提取出 Chunk 中的 CSS 代码到单独的文件中
                use: ExtractTextPlugin.extract({
                    // 压缩 CSS 代码
                    use: ['css-loader?minimize'],
                    // 指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
                    publicPath: '//img.cdn.com/id/'
                }),
            },
            {
                // 增加对 PNG 文件的支持
                test: /\.png$/,
                // 给输出的 PNG 文件名称加上 Hash 值
                use: ['file-loader?name=[name]_[hash:8].[ext]'],
            },
            // 省略其它 Loader 配置...
        ]
    },
    plugins: [
        // 使用 WebPlugin 自动生成 HTML
        new WebPlugin({
            // HTML 模版文件所在的文件路径
            template: './template.html',
            // 输出的 HTML 的文件名称
            filename: 'index.html',
            // 指定存放 CSS 文件的 CDN 目录 URL
            stylePublicPath: '//css.cdn.com/id/',
        }),
        new ExtractTextPlugin({
            // 给输出的 CSS 文件名称加上 Hash 值
            filename: `[name]_[contenthash:8].css`,
        }),
        // 省略代码压缩插件配置...
    ],
}