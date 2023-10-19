const babel = require('@babel/core');
const types = require('@babel/types');
// const transformFunction = require('babel-plugin-transform-es2015-arrow-functions');

const transformFunction = {
    visitor: {
        ArrowFunctionExpression(path) {
            let { node } = path;
            node.type = "FunctionExpression";

            hoistFunctionEvn(path);

            let body = node.body;   // 老节点内容 a + b
            if (!types.isBlockStatement(body)) {
                node.body = types.blockStatement([types.returnStatement(body)]);
            }
        }
    }
}

function getThisPath(path) {
    const arr = [];
    path.traverse({
        ThisExpression(path) {
            arr.push(path);
        }
    });
    return arr;
}

function hoistFunctionEvn(path) {
    const thisEnv = path.findParent((parent) => (parent.isFunction() && !parent.isArrowFunctionExpression()) || parent.isProgram());
    const bindingThis = '_this';
    const thisPaths = getThisPath(path);

    // 修改当前路径的this变为_this
    thisPaths.forEach(tp => {
        tp.replaceWith(types.identifier(bindingThis));
    });

    thisEnv.scope.push({
        id: types.identifier(bindingThis),
        init: types.thisExpression()
    })
}

const code = `function a() { const sum = () => console.log(this) }`;

const result = babel.transform(code, {
    plugins: [transformFunction]
});
console.log(result.code);