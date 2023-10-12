# location对象
- 提供了当前窗口中加载文档的信息，以及导航功能，即是window的属性也是document的属性
- 属性
  - href    protool+host(hostname+port)+pathname+search+hash
  - origin  只读
- 方法
  - assign  修改浏览器地址，立即导航同时在浏览器历史记录添加信息
  - replace 修改浏览器地址，替换历史记录最上面的记录
  - reload(boolean) 重新加载当前页面，boolean为true表示从服务器加载，为false可能走缓存

# navigator对象
- 只要浏览器启用JS，就会有navigator对象

# history对象
- 表示当前窗口首次使用以来用户的导航历史记录，该对象不会暴露用户访问过的URL，但可以在不知道URL的情况下进行前进和后退
- 方法
  - go(number|string)  整数表示前进，负数表示后退，0表示刷新；字符串表示导航到历史中包含该字符串的第一个位置（可能前进也可能后退）
  - back()
  - forward()
  - pushState(state,titile,url)
  - replaceState(state,title,url)
  - hashchange()    当hash变化触发该事件
  - popState()