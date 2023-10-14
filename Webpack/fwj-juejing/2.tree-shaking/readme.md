# Tree-Shaking
- 在webpack中启用tree-shaking必须满足三个条件
  - 使用ESM规范编写模块代码
  - 配置optimization.usedExports为true，启动标记功能
    - 其作用是标记哪些没有被其他模块使用的“导出语句”
  - 启动代码优化功能，以下方式可以实现
    - mode = production
    - optimization.minimize = true
    - 提供optimization.minimize数组

## 核心原理
- 需要标记出模块导出值中哪些没有被使用过
- 使用压缩代码插件

## 源码分析
- 构建阶段，收集模块导出变量并记录到模块依赖关系图ModuleGraph对象中
  - 导出语句转换为Dependency对象，并记录到module对象的dependencies集合
    - 具名导出转换为HarmonyExportSpecifierDependency对象
    - default导出转换为HarmonyExportExpressionDependency对象
- 封装阶段，遍历所有模块，标记模块导出变量没有没被使用
  - 遍历module对象的dependencies数组，找到所有HarmoneyExportxxxDependency对象，将其转换为ExportInfo对象并记录到ModuleGraph对象中
  - 遍历每一个module对象的ExportInfo数组，为每个对象执行compilation.getDependencyReferencedExports，确定对应的dependency对象有没有被其他模块使用
  - 对于调用值调用exportInfo.setUsedConditionally将其标记为使用
  - 执行完毕，将所有导出语句的使用状况记录到exportInfo._usedInRuntime字典中
- 使用代码优化插件--Terser删除无效代码