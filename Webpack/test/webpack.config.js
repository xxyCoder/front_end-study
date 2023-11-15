const path = require('path');

module.exports = {
    entry: {
        index: "./src/index.js",
        index2: "./src/index2.js"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].[hash:8].js"
    },
    mode: "development",
    optimization: {
        splitChunks: {
            chunks: "all",
            minChunks: 2,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,
                    minSize: 0,
                    idHint: "vendors"
                }
            }
        }
    }
}