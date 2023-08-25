module.exports = {
    watch: true,
    watchOptions: {
        ignore: /node_modules/,
        // 监听到变化后等待300ms再执行动作，避免更新太快导致重新编译频率高
        aggregateTimeout: 300,
        // 不断轮询文件有没有变化的间隔
        poll: 2000
    }
}