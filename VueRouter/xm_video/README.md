# vue-router的三个模式
- hash模式
  - 是url中hash(#)及后面部分
  - 改变url中的哈希部分不会引起页面改版
  - 通过hashchange监听url变化
  ```js
   window.addEventListener('hashchange',(e) => {})
  ```
- history模式
  - history提供了pushState和replaceState两个方法，都不会引起页面刷新
  - 通过popState事件监听
    1. 改变url触发popState事件
    2. 通过pushState/replaceState或a标签改变url不会触发popState
    3. 可以拦截pushState/replaceState的调用以及a标签的点击检测url变化
    4. 通过js调用history的go、forward、back方法触发该事件
  ```js
   window.addEventListener('popState',(e) => {})
  ```

# 编程式路由导航
- 拿到router对象 useRouter
- push一个对象{ path: '/xxx' } 或者 { name: 'xxx' }

# 传递参数
- push对象中加入可选属性query
  - 使用route (通过useRoute获得) 拿到传递的参数router.query.xxx
- push对象加入可选属性params

# 动态路由
- 路径中使用一个动态字段，称之为路径参数
- 动态字段以 ：冒号开始
- 其动态字段的值可以通过route.params拿到

# sensitive与strict路由配置
- 默认情况下，所有路由都不区分大小写，并且能匹配带有或不带有尾部斜线的路由
- 通过选项配置是单个path还是全部path