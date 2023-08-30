const path = require('path');

module.exports = {
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    }
}