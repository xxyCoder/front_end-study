const path = require('path');

module.export = {
    module: {
        rule: [
            {
                test: /.js$/,
                use: ['babel-loader'],
                include: path.resolve(__dirname, './src')
            }
        ],
        noParse: [/react\.min\.js$/]
    },
    resolve: {
        modules: [path.resolve(__dirname), 'node_modules'],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js')
        },
        extensions: ['js', 'json']
    },
}