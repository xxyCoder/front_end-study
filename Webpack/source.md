# webpack/bin/webpack.js
1. 首先判断cli.installed，如果安装了webpack-cli就运行，没有则引导安装
  - 判断通过在从当前目录逐级往上找是存在node_modules/webpack-cli目录，找到顶部也没有找到则通过`require("module").globalPaths`拿到可能包含全局模块的路径，判断是否存在webpack-cli目录
  - 没有安装的时候通过console.error告诉用户需要安装，通过目录下有什么配置文件如yarn.lock、pnpm
  - 通过readline读取用户输入，如果y则安装，开启一个子线程，返回一个promise
2. 运行runCli
  - 拿到webpack-cli/package.json文件，根据是否为module调用不同的引入webpack-cli

# webpack-cli/bin/cli.js
1. 如果允许从本地加载则使用'import-local'优先从本地加载
2. 创建webpack-cli实例，并将process.argv传入
  - webpack-cli内置了四个命令build、watch、version、help，还有扩展的serve、init、loader、plugin等

# webpack运行时
- __webpack_require__主要是将模块执行并将内容缓存
```js
function __webpack_require__ (moduleId) {
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
  };
  modules[moduleId].call(...);
  module.l = true;
  return module.exports;
}
```
- __webpack_require__.o用来判断导出的exports有没有挂载过一个对象
```js
__webpack_require__.o = function(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
```
- __webpack_require__.d主要是对于变为getter函数的导出内容挂载在exports中
```js
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, {
      enumerable: true,
      get: getter
    })
  }
}
```

# 异步chunk
- 异步的chunk调用self["webpackChunk"].push是已经重写了的函数，即webpackJsonpCallback函数
- 异步chunk加载通过__webpack_require__.e，该函数返回一个promise
- __webpack_require__.f.j对于当前的chunkId存储到installedChunks中，并创建一个promise使用
```js
__webpack_require__.f.j = function() {
  ...
  var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
  promises.push(installedChunkData[2] = promise);
  // chunk loading
  var url = ...
  var loadingEnded = (event) => {};
  __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
}
```
- __webpack_require__.l主要是创建script元素挂载上去开始加载
```js
var scripts = document.getElementsByTagName("script");
for(var i = 0; i < scripts.length; i++) {
  var s = scripts[i];
  if(s.getAttribute("src") == url) { script = s; break; }
}
if(!script) {
  needAttach = true;
  script = document.createElement('script');
  script.charset = 'utf-8';
  script.timeout = 120;
  script.src = url;
}
var timeout = setTimeout(...)
script.onerror = ...
script.onload = ...
document.head.appendChild(script);
```
- webpackJsonpCallback函数
```js
function webpackJsonpCallback(..., data) {
  const [ chunksIds, moreModules, runtime ] = data;
  var moduleId, chunkId, i = 0;
  if(chunkIds.some((id) => (installedChunks[id] !== 0))) { // 存在没有加载完的
    for(moduleId in moreModules) {
      if(__webpack_require__.o(moreModules, moduleId)) {
        __webpack_require__.m[moduleId] = moreModules[moduleId];
      }
    }
    if(runtime) var result = runtime(__webpack_require__);
  }
  for (; i < chunksIds.length, ++i) {
    if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
      installedChunks[chunkId][0](); // resolve()
    }
    installedChunks[chunkId] = 0; // 0表示已经加载完成
  }
}
```