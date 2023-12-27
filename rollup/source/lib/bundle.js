const fs = require('fs');
const Module = require('./module');

class Bundle {
    constructor(options) {
        this.entryPath = options.entry.replace(/\.js$/, '') + '.js';
        this.modules = {}; // 存放所有模块 入口文件和其依赖
    }
    build(outputFilename) {
        let entryModule = this.fetchModule(this.entryPath);
    }
    fetchModule(importee) {
        let route = importee;
        if (route) {
            const code = fs.readFileSync(route, 'utf-8');
            let module = new Module({
                code,
                path: route,
                bundle: this
            });
            return module;
        }
    }
}

module.exports = Bundle;