# ES Module
- 通过声明 .mjs后缀的文件或在package.json里指定type为module两种方式使用ES Module
- export用于对外导出
  - export  导入时候需要加上 {}
  - export default  为模块指定默认输出,这样加载就不需要知道所加载的模块名,一个文件只可以使用一次
  - 导入可以使用as起别名
- 动态导入模块,返回一个Promise