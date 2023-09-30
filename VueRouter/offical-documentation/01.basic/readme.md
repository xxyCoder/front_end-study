# 带参数的动态路由
- 路径中使用一个动态字段，称之为路径参数
- 它的参数值在route.params中暴露出来

# 嵌套路由
- 以 / 开头的嵌套路径被视为根路径，允许使用组件嵌套而不必使用嵌套的URL

# 编程式路由导航
- router.push()
- router.replace()
- 如果提供了path，那么params会被忽略
- go()
- 上述方法返回一个Promise，等到导航完成才知道是成功还是失败

# 命名视图
- router-view   没有设置名字，则默认为default

# 重定向和别名
- redirect
- alias

# 将props传递给组件
- 在你的组件中使用 $route 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 URL。虽然这不一定是件坏事，但我们可以通过 props 配置来解除这种行为