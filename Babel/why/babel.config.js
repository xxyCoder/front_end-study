import "@babel/polyfill"

module.exports = {
    presets: [
        ["@babel/preset-env", {
            "useBuiltIns": "entry"
        }]
    ]
}
