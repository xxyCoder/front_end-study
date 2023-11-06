console.log("postcss.config.js");

module.exports = {
    plugins: [
        require("autoprefixer"),
        require("./postcss-color")
    ]
}