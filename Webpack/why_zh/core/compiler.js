const { SyncHook } = require('tapable');
const { toUnixPath } = require('./utils');
const path = require('path');

class Compiler {
    constructor(options) {
        this.options = options;
        // 创建plugin hooks
        this.hooks = {
            // 开始编译的钩子
            run: new SyncHook(),
            // 输出asset到ouput目录之前执行
            emit: new SyncHook(),
            // 在compilation完成时执行 全部完成编译执行
            done: new SyncHook()
        }
        // 相对路径跟Context参数
        this.rootPath = this.options.context || toUnixPath(process.cwd())
    }
    // 启动编译
    run(callback) {
        // 发布开始执行的订阅
        this.hooks.run.call();
        const entry = this.getEntry();
    }
    // 获取入口文件路径
    getEntry() {
        let entry = Object.create(null);
        const { entry: optionsEntry } = this.options;
        if (typeof optionsEntry === 'string') {
            entry['main'] = optionsEntry;
        } else {    // 数组或对象
            entry = optionsEntry;
        }
        // 将entry变为绝对路径
        Object.keys(entry).forEach((key) => {
            const value = entry[key];
            if (path.isAbsolute(value)) {
                entry[key] = toUnixPath(path.join(this.rootPath, value))
            }
        })
    }
}

module.exports = Compiler;