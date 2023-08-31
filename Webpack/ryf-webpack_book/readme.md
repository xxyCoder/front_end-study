# webpack命令
- webpack 构建为development
- webpack 构建为production
- webpack --watch 持续监听并且构建
- webpack -d 构建包括source maps
- webpack --colors 产出有颜色

# demo01 (entry file)
- 单入口文件
# demo02 
- 多入口文件
# demo03 babel-loader
- 转换es6以及jsx文件为普通的js文件
# demo04 css-loader
- 转换为内联css
# demo05 url-loader
- 将img类型转换成img标签
  - 图片大小超过options.limit 则是url形式
  - 小于等于 则是data url
# demo06 css-loader
- options中开启modules为true
# demo07 uglifyjsplugin
- 压缩JS
# demo08 
- html-webpack-plugin自动创建html文件
- open-browser-webpack-plugin 自动打开
# demo09 code splitting
- 将JS大文件变成一些chunks
  - 如果一些代码块当且仅当被require