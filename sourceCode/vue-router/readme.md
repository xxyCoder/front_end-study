# 前端路由实现原理
- hash模式，通过URL#后面的内容做区分，hash值发生变化并不会导致浏览器页面的刷新，只是会触发hashchange事件
- history模式，路由和正常URL完全一致
  - H5新增两个API：pushState和replaceState，这两个API可以改变URL并且浏览器不会向后端发生请求，监听popState事件可以知道pushState修改路由的变化
  - 但是只是使用了pushState并不会触发popState，除非浏览器使用了go、forward等

## pushState和repalceState
- 接收两个参数，第三个参数是可选参数url
- 第一个参数是JS对象，可以通过history.state查看
- 第二个参数是title，可以传空