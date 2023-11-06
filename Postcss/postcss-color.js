module.exports = (options = {}) => {
    return {
        postcssPlugin: "postcss-color",
        Once(root) {
            root.walkDecls(decl => {
                console.log("decl:", decl);
            });
        },
        Declaration: {  // 提供便捷方式，更快访问某个AST节点
            color(decl, postcss) {
                if (decl.prop === "color" && decl.value === "white") {
                    decl.value = "#fff";
                }
            }
        }
    }
}

module.exports.postcss = true;