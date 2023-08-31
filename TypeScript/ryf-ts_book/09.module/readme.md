# 模块
- TS模块除了支持ES模块语法还支持输出和输入类型
- 为了区分类型和变量，类型前面加type
- import type 语句只能导入类型
- export也可加type表示导出的是类型
- 允许 import = 语句输入CommonJs模块
- export = 语句输出CommonJS模块，等同于CommonJS的module.exports