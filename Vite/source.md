# 原理篇

## vite如何让浏览器识别vue文件的
- vue文件在打包的时候被构建成JS文件
- 浏览器发送请求获取.vue文件
- 后端返回.vue文件，同时设置响应头content-type为text/javascript