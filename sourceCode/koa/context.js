const proto = {};

function defineGetter(prop, name) {
    // 每个对象都有__defineGetter__方法，用其实现代理
    proto.__defineGetter__(name, function () {
        return this[prop][name]
    })
}

function defineSetter(prop, name) {
    proto.__defineSetter__(name, function (val) {
        this[prop][name] = val
    })
}

defineGetter('request', 'url');
defineGetter('request', 'path')
defineGetter('request', 'query')

defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = proto