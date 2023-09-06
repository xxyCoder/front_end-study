const { SyncHook } = require('tapable');
const { toUnixPath } = require('./utils');
const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types')
const tryExtensions = require('./utils/index')

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
        this.rootPath = this.options.context || toUnixPath(process.cwd());
        // 保存所有入口模块对象
        this.entries = new Set();
        // 保存所有依赖模块对象
        this.modules = new Set();
        // 保存所有代码块对象
        this.chunks = new Set();
        // 存放本次产出的文件对象
        this.assets = new Set();
        // 存放本次编译所有产出的文件名
        this.files = new Set();
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
    // 入口编译方法
    buildEntryModule(entry) {
        Object.keys(entry).forEach((entryName) => {
            const entryPath = entry[entryName];
            const entryObj = this.buildModule(entryName, entryPath);
            this.entries.add(entryObj);
        })
    }
    buildModule(moduleName, modulePath) {
        // 通过fs读取源代码
        // 调用匹配的Loader
        // 进行编译，修改源码的中的require
        // 有依赖则递归依赖，没有则返回编译后模块

        // 模块编译
        const originSourceCode = (this.originSourceCode = fs.readFileSync(modulePath, 'utf-8'));
        // moduleCode是修改后的代码
        this.moduleCode = originSourceCode;
        // 调用loader
        this.handleLoader(modulePath);
        // 调用webpack 进行模块编译，获得最终module对象
        const module = this.handleWebpackCompiler(moduleName, modulePath);
        return module;
    }
    handleLoader(modulePath) {
        const matchLoaders = [];
        // 1. 获取所有传入的loader规则
        const rules = this.options.module.rules;
        rules.forEach((loader) => {
            const testRule = loader.test;
            if (testRule.test(modulePath)) {
                if (loader.loader) {
                    matchLoaders.push(loader.loader);
                } else {
                    matchLoaders.push(...loader.use);
                }
            }
            // 倒序执行
            for (let i = matchLoaders.length - 1; i >= 0; --i) {
                const loaderFn = require(matchLoaders[i]);
                this.moduleCode = loaderFn(this.moduleCode);
            }
        })
    }
    handleWebpackCompiler(moduleName, modulePath) {
        // 将当前模块相对于项目启动根目录计算出相对路径，作为模块ID
        const moduleId = './' + path.posix.relative(this.rootPath, modulePath);
        // 创建模块对象
        const module = {
            id: moduleId,
            dependencies: new Set(),    // 模块所依赖模块绝对路径地址
            name: [moduleName]  // 模块所属的入口文件
        }
        // 调用Babel分析代码
        const ast = parser.parse(this.moduleCode, {
            sourceType: 'module'
        });
        // 深度遍历语法Tree
        traverse(ast, {
            // 遇到require语句
            CallExpression: (nodePath) => {
                const node = nodePath.node;
                if (node.callee.name === 'require') {
                    // 获得源代码相对路径
                    const requirePath = node.arguments[0].value;
                    // 寻找模块绝对路径
                    const moduleDirName = path.posix.dirname(modulePath);
                    const absoultePath = tryExtensions(
                        path.posix.join(moduleDirName, requirePath),
                        this.options.resolve.extensions,
                        requirePath,
                        moduleDirName
                    )
                    const moduleId = './' + path.posix.relative(this.rootPath, absoultePath);
                    // 通过Babel修改源代码的require变成__webpack_require__
                    node.callee = t.identifier('__webpack_require__');
                    // 修改源代码中require语句引入的模块
                    node.arguments = [t.stringLiteral(moduleId)];
                    // 为当前模块添加依赖
                    module.dependencies.add(moduleId);
                }
            }
        })
        // 遍历结束根据AST生成新的代码
        const { code } = generator(ast);
        // 为当前模块挂载新代码
        module._source = code;
        return module;
    }
}

module.exports = Compiler;