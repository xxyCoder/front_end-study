# 网页生命周期
- readystatechange  当readystate的改变会触发该事件
  - loading 文档仍然在加载
  - interactive 文档加载结束并被解析，当时像图片、样式、frame之类的子资源仍然在加载
  - complete    文档和子资源加载完毕
- onpageshow    用户浏览网页时触发，每次加载页面都会触发，在onload之后触发
- onload    加载页面触发（即readystate=complete之后），页面从浏览器缓存中读取不触发
- beforeunload  文档或其资源要卸载的时候触发，此时文档依然可见
- DOMContentLoaded  当文档被完全加载和解析完成之后（即readystate=interactive之后）