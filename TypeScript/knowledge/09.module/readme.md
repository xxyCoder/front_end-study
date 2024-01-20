# 模块
- 任何包含了import和export语句的文件，就是一个模块，相应的，如果文件不包含export语句，就是一个全局脚本文件
- TS模块除了支持ES模块语法还支持输出和输入类型
  - export type | import type
- 为了区分类型和变量，类型前面加type
- 允许 import = 语句输入CommonJs模块，export = 语句输出CommonJS模块，等同于CommonJS的module.exports