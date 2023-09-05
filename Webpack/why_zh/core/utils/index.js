const path = require('path');

export function toUnixPath(path) {
    // 将window的路径分隔符\换成unix /
    return path.replace(/\\/g, '/')
}
