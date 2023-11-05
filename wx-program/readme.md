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

# rpx
- rpx将所有设备的屏幕，在宽度上等分为750份rpx

# 样式导入
- @import

# 小程序窗口组成部分
- navigationBar导航区域
- background背景区域，默认不可见，下拉才显示
- 页面主体区域
- tarBar 最少2个，最多5个，其list的第一个页面必须在最前面pages配置第一个

# 网络请求限制
- 只能请求HTTPS类型的接口
- 必须将接口的域名添加到信任列表
- 提供wx.request方法发起GET请求
- 跨域问题只存在于浏览器的web开发中，而小程序的宿主环境不是浏览器，而是微信客户端，所以不存在跨域问题

# 导航
- 声明式导航，页面声明<navigation>导航组件
  - 条件到tatBar页面，url必须是/开头，open-type="switchTab"
- 编程式导航，调用小程序API，实现跳转
- 传递参数类似query方式 ?name=xxyCoder&age=21，在onload的方法中使用options形参接参数

# 生命周期
- 应用生命周期
  - onLauch小程序车初始化完成执行
  - onShow小程序从后台进入前台或启动时执行
  - onHide小程序从前台进入后台时触发
- 页面生命周期
  - onLoad页面加载时
  - onShow页面显示时
  - onReady页面初次渲染完成，一个页面只调用一次，此时可以和页面内容进行交互
  - onHide页面隐藏触发
  - onUnload页面卸载触发

# WXS脚本
- wxml可以调用wxs中定义的函数
- 语法类似JS，但是有自己的数据类型、不支持ES6及其以上的语法、遵循CommonJS规范
- wxs中定义的函数不能作为组件的事件回调函数，只能用在{{}}中
- wxs的运行环境与JS的运行环境的相互隔离的，即wxs不能调用JS中定义的函数
- 在IOS设备上，wxs性能比JS快，但是在安卓上没有太大区别

# 组件
- 局部引用，在页面的.json文件的usingComponents写对应的键值对
- 全局引用，在app.json文件的usingComponents写对应的键值对
- 与页面的区别
  - .json需要声明component:true
  - .js文件中调用的是Component()函数
  - 组件的事件处理函数需要定义methods节点中
- 组件样式隔离，外部不会影响组件，组件不会影响外部
  - app.wxss的全局样式对组件无效
  - 只有class选择有样式隔离效果
- 修改组件的样式隔离选项
  - 在.js或.json文件添加styleisolation修改组件样式隔离
    - isolated 表示启用样式隔离
    - apply-shared 表示页面wxss将影响到自定义组件，但组件不会影响页面
    - shared 表示页面wxss影响到组件，组件也可以影响页面
- properties 是外部传递给组件的数据，与vue不同，是可写的，且data === properties

# 纯数据字段
- 指哪些不用于界面渲染的data字段
- 有利于提升页面更新的性能
- 在Component构造器的options节点中，指定pureDataPattern为一个正则表达式，符合该表达式的成为纯数据字段

# 组件的生命周期
- create，组件刚被创建时执行
  - 此时还不能调用setDate
  - 只能给组件的this添加一些自定义属性的字段
- attached，组件实例进入页面节点树执行
  - 此时this.data初始化完成
  - 可以发送网络请求
- ready，在组件视图层布局完后执行
- moved，在组件实例移动到另一个位置时执行
- detached，组件实例被页面节点树移除时执行
- error，每当组件抛出错误时执行
- 在lifetimes中声明定义（新方式），也可以与data平级定义（旧方式），新旧同时存在，以新方式为主

# 组件所在页面声明周期函数
- show，组件所在页面被展示执行
- hide，组件所在页面被隐藏执行
- resize，组件所在页面尺寸变化时执行
- 在pageLifetimes字段中声明

# 插槽
- 默认是单个插槽，需要多插槽可以在options中设置multipleSlots:true
- 多个插槽使用name区分不同的插槽
  - 父组件添加slot属性对应不同的name插槽

# 父子组件通信
- 属性绑定，父组件向子组件设置属性值
- 事件绑定，子组件可以向父组件传递数据
  - 父组件给子组件bind:方法名绑定自定义事件
  - 子组件调用
- 获取属性实例，this.selectComponent(id或class选择器)获取子组件实例对象
  - 可以调用任意方法和数据

# 组件之间代码共享
- behaviors，类似vue.js中的mixins
- 可以包含一组属性、数据、生命周期和方法，组件引用它，其代码会被合并到组件中
- behaviors也可以引用其他的behavior
- 使用require导入behavior，挂载在behaviors字段中即可使用
- 同名字段的覆盖和组合规则
  - 同名字段是对象，则进行对象合并
  - 同名字段的其他情况，组件 > 父behavior > 子behavior 、靠后的behavior > 靠前的behavior 按优先级覆盖

# 分包
- 可以优化小程序首次下载速度
- 更好的解耦
- 分包后变成一个主包+多个分包
- 单个包不能超过2M，所有分包不能超过16M
- 在app.json中配置subPackages启动分包
  - root 分包的目录
  - pages 所有页面存储的路径
  - name 分包的别名
  - independent 改为独立分包，不依赖主包
- tarBar页面必须在主包内，分包不能嵌套
- 主包无法引用分包、独立分包的私有资源（wxss、js、wsx等）
- 分包之间不能相互引用私有资源，可以引用主包内的共有资源
- 独立分包之间也不能相互引用私有资源，也不能引用主包的公共资源

## 分包预下载
- preloadRule节点定义预下载
- key是触发预下载的路径
  - network all(不限网络) wifi(仅在wifi模式下下载)
  - packages 数组，表示进入页面需要下载哪些分包，可以填root或name
- 同一个分包的页面享有共同的预下载大小限额2M