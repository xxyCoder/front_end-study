const path = require('path');

module.exports = {
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [
                path.join(__dirname, '.babelrc')
            ]
        }
    }
}