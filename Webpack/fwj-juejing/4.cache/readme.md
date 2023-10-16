# 缓存
- cache提供了若干用于配置缓存效果，缓存周期的配置项
  - type
    - memory
    - filesystem
  - cacheDirectory  缓存文件路径，默认在node_modules/.cache/webpack
  - buildDependencies   额外依赖的文件，当文件发生变化的时候，缓存就立即失效而执行完整的编译构建
  - managedPaths    受控目录，Webpack构建时会跳过新旧代码哈希值与时间戳对比，直接使用缓存副本，默认值是['./node_modules']
  - maxAge  缓存失效时间

## 原理
- Webpack5会将首次构建出的Chunk、Module、ModuleGraph等对象序列化后保存在硬盘中，后面运行的时候就可以跳过许多耗时的编译