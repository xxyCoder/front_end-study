# 管理npm包
## main与module
- main字段 当文件引入是CJS方式，会查询该字段，如果没有，则查询module字段
- module字段 当文件引入是ESM方式，会查询该字段，如果没有，则查询main字段
- 两个字段都不存在的话，则寻找当前包下的index.js作为入口文件

## 如果使用了ESM但是想要引入时查找入口先查看main字段呢？
- 如果使用webpack构建的项目，可以使用 resolve.mainFields 处理

## browser
- 针对特定环境（浏览器环境）下的入口文件定义字段
- 第一种含义，配置browser作为一个单一的字符串它会替换main字段作为浏览器下包的入口文件
- 第二种含义，配置browser作为Map对象表示声明要替换的路径或文件，其值可以是路径也可以是布尔（false表示禁止将该module加入的构建产物中）

## exports
- 提供了对于入口文件的替代品字段，优先级高于任何入口字段，包括webpack中的resolve.mainFields字段
- 可以路径封装
  - "." 表示入口文件
- 条件导出
  - "import": ""    ESM入口文件
  - "require": ""   CJS入口文件
  - "default": ""   默认选项，匹配任何选项，放在最后
- 嵌套条件

## 其他字段
- name 项目名称
- version 版本号
- description 项目描述
- scripts 脚本命令
- dependencies 项目生产环境依赖
- devDependencies 项目开发环境依赖
- repository 项目仓库地址
- keywords 关键字，描述项目的功能或特点
- license 项目许可证