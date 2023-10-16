module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: "thread-loader",
                    options: {
                        workers: 2,
                        workerParalleJobs: 50
                    }
                }, "babel-loader", "eslint-loader"]
            }
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                parallel: 2
            })]
        }
    }
}