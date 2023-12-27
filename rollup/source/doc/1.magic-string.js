const MagicString = require('magic-string');

// 很多模块，将其打包在一个文件里
const bundleString = new MagicString.Bundle(); 
bundleString.addSource({
    content: "var a = 1;",
    separator: '\n'
});

bundleString.addSource({
    content: "var b = 2;",
    separator: '\n'
});

console.log(bundleString.toString())