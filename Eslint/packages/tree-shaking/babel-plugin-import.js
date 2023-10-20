const core = require('@babel/core');
const t = require('@babel/types');

let libraryName;
function babelPluginImport(options) {
    ({ libraryName = "hy-store" } = options);
    return {
        visitor: {
            ImportDeclaration(nodePath) {
                if (checkedDefaultImport(nodePath) || checkedLibraryName(nodePath)) {
                    return;
                }
                const node = nodePath.node;
                const { specifiers } = node;
                const ImportDeclaration = specifiers.map((specifier, index) => {
                    const moduleName = specifier.imported.name;
                    const localIdentifier = specifier.local;
                    return generatorImportStatement(moduleName, localIdentifier);
                });
                if (ImportDeclaration.length === 1) {
                    nodePath.replaceWith(ImportDeclaration[0]);
                } else {
                    nodePath.replaceWithMultiple(ImportDeclaration);
                }
            }
        }
    }
}

// 检查是否是默认导入
function checkedDefaultImport(nodePath) {
    const { node } = nodePath;
    const { specifiers } = node;
    return specifiers.some(specifier => t.isImportDefaultSpecifier(specifier));
}

// 检查导入是否是匹配库
function checkedLibraryName(nodePath) {
    const { node } = nodePath;
    return node.source.value !== libraryName;
}

function generatorImportStatement(moduleName, localIdentifier) {
    return t.importDeclaration(
        [t.importDefaultSpecifier(localIdentifier)],
        t.stringLiteral(`${libraryName}/${moduleName}`)
    );
}

module.exports = babelPluginImport;