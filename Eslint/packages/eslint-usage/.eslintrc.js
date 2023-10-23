module.exports = {
    root: true, // 停止向上继承eslintrc.js
    // 当前可用使用那个环境的全局变量
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",    // 继承他人的规则
    "overrides": [   // 进行特定文件的规则覆盖
        {
            "files": ["test.js"],
            "rules": {
                "no-unused-expressions": 2
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",    // 代码支持的ES版本
        "sourceType": "module", // 支持的模块规范
        "ecmaFeatures": {
            "jsx": true,    // 允许jsx语法
            "globalReturn": true,   // 允许全局下使用return
            "impliedStrict": true   // 开启全局严格模式
        }
    },
    "rules": {  // 添加规则，可覆盖extends的规则
        "quotes": ["error", "double"],
        "zlint/no-var": ["error"]
    },
    "globals": {
        custom: "readonly",
        b: "writable"
    },
    "plugins": ["@typescript-eslint/eslint-plugin","zlint"],    // rules不能满足要求，使用plugins扩展处理需求
    // "parser": "@ypescript-eslint/parser"  // 指定解析器
}
