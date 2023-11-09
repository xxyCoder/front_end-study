import { defineConfig } from 'vite'
const postcssPresetEnv = require('postcss-preset-env');

export default defineConfig({
    root: "",
    optimizeDeps: {
        exclude: [] // 哪些模块不需要预处理
    },
    css: {  // 对css行为做处理
        modules: {  // 对css module处理，该配置最终传给postcss module
            localsConvention: "camelCase",   // 修改配置对象key的展示形式
            scopeBehaviour: "local",    // local默认值，表示当前模块化行为是全局还是局部
            generateScopedName: "[name]_[local]_[hash:5]",  // 生成类名的规则，也可以配置成函数形式
            hashPrefix: "xxy",  // 参与到hash生成中
            globalModulePaths: []   // 代表不想参与到css module的路径
        },
        preprocessorOptions: {  // key是预处理器名字,value是配置对象
            less: {
                math: "always",
                globalVars: {   // 全局变量
                    mainColor: "red"
                }
            }
        },
        devSourcemap: true,
        postcss: {  // postcss配置文件
            plugins: [postcssPresetEnv()]
        }
    }
})