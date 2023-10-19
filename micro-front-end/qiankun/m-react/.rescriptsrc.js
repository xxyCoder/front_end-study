// 重写webpack配置文件

module.exports = {
    webpack: (config) => {
        config.output.libraryTarget = "umd";
        config.output.library = "m-react"
        return config;
    }
}