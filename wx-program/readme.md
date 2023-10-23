# 项目结构
- pages存放所有小程序的页面
- utils用来存放工具性质的模块
- app.js小程序入口文件
- app.json小程序的全局配置文件
- app.wxss小程序的全局样式文件
- project.config.json项目的配置文件
- sitemap.json用来配置小程序以及页面是否允许被微信索引

## app.json
- pages 记录所有页面的路径
  - 修改排列顺序就会改变渲染顺序，第一项是当作首页渲染
- window  窗口外观
- style 全局组件所使用的版本样式
- sitemapLocation 指定sitemap位置
## project.config.json
- setting保存了编译相关的配置
- projectname保存的是项目名称
- appid保存的是小程序账号的id 
## WXML和HTML的区别
- 标签名不同
- 属性节点不同
- 提供了类似vue中的模板语法
## WXSS和CSS区别
- 新增了rpx尺寸单位
- 提供了全局和局部样式
- WXSS仅支持部分CSS选择器
  - class、id、element、并集、后代、::after和::before等选择器

# 宿主环境
- 手机微信是小程序的宿主环境
- 提供了通信模型
  - 渲染层和逻辑层的通信、逻辑层和第三方服务器的通信
- 提供了运行机制
  - 将代码下载到本地，解析app.json，执行App函数，渲染页面
  - 加载解析页面的.json文件，加载.wxml和.wsxx，执行Page函数创建页面实例完成渲染
- 提供了组件和API
  - 事件监听API
    - 以on开头，监听某些事件的触发
  - 同步API
    - 以Sync结尾的API
  - 异步API
    - 需要通过success、fail、complete接收回调结果
