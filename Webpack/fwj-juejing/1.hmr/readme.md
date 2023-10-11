# Hot Module Replacement 模块热更新
- 能够保持页面状态不变的情况下动态替换、删除、添加代码模块

## 实现原理
1. 使用webpack-dev-server托管静态资源，同时以Runtime方式注入一段HMR逻辑的客户端代码
2. 浏览器页面加载后，与wds建立websocket连接
3. Webpack监听到文件变化后，增量构建发生变更的模块，并通过websocket发送hash事件
   - HotModuleReplacementPlugin插件会借助Webpack的watch能力，在代码发生变化后进行增量构建，生成：
     - manifest文件：JSON格式，包含所有变更的模块列表，命名为[hash].hot-update.json
     - 模块变更文件：JS格式，包含编译后的模块代码，命名为[hash].hot-update.js
     - 增量构建完触发compilation.hooks.done钩子，并传递本次钩子的统计信息对象stats，WDS则监听done钩子，在回调中通过webpack发送模块更新消息
    ```js
    { "type": "hash", "data": `${stats.hash}` }
    ```
4. 浏览器接收到hash事件后，请求manifest资源文件，拿到[hash].hot-update.json，确认增量变更范围，发送请求拿到发送[hash].hot-update.js   
5. 浏览器加载发生变更的增加模块
6. Webpack运行时触发变更模块的module.hot.accept回调，执行变更逻辑
```js
import component from './component';
const node = document.createElement("div");
node.innerText = component;
document.body.appendChild(node);

module.hot.accept('./component.js',() => {
    node.innerText = node;
})
```