# 模块加载机制
- 在Node.js中模块加载一般会经历三个阶段：路径分析、文件定位、编译执行
- this指向模块本身
- 运行时加载，不会将require提示
- 导出的是一个值拷贝，会对加载结果进行缓存

## 缓存
- 模块在第一次加载后被缓存，缓存于require.cache

## 相互引用会造成死循环吗？
- 启动index.js模块的时候，会加载index.module.js，那么index.module.js中又需要加载index.js，但是此时index.js并没有执行完，返回的是index.js未完成的副本给index.module.js，故不会陷入死循环

## exports 与 module.exports关系
- const exports = module.exports

## module对象
- children  这个模块首次需要的对象
- exports   导出的对象
- loaded    模块是否已经完成加载或正在加载