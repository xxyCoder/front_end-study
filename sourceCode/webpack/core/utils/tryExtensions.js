const fs = require('fs');
function tryExtensions(
    moudlePath,
    extensions,
    originModulePath,
    moduleContext
) {
    // 优化不需要扩展名选项
    extensions.unshift('');
    for (let extension of extensions) {
        if (fs.existsSync(moudlePath + extension)) {
            return moudlePath + extension;
        }
    }
    // 未匹配到对应文件
    throw new Error("No Module,Can not find")
}

module.exports = tryExtensions;