# Suspense
- 内置组件，用来在组件树中协调对异步依赖的处理，可以让我们在组件树上层等待下层的多个嵌套异步依赖项解析完成，并在等待时渲染一个加载状态
- 有两个插槽
  - #default    
  - #fallback
- 会触发三个事件：pending、resolve、fallback
  - pending是进入挂载时触发
  - resolve是default插槽完成新内容获取
  - fallback是在fallback插槽内容显示时触发