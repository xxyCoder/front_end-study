const MagicString = require("magic-string");
const path = require("path");
const { parse } = require("acorn")

class Module {
    constructor({ code, path, bundle }) {
        this.code = new MagicString(code, { filename: path });
        this.path = path;
        this.bundle = bundle;
        this.ast = parse(code, {
            ecmaVersion: 7,
            sourceType: "module"
        });
        this.analyse();
    }
    analyse() {
        
    }
}

module.exports = Module;