module.exports = {
    // 当前可用使用那个环境的全局变量
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",    // 继承他人的规则
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {  // 添加规则，可覆盖extends的规则
        "quotes": ["error", "double"]
    },
    "globals": {
        custom: "readonly",
        b: "writable"
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    parser: "@ypescript-eslint/parser"
}
