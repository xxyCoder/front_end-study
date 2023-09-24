# 导航守卫
- 全局、单个路由独享、组件级路由
  - 全局
    - 前置守卫，导航被触发时
    - 解析守卫，导航被确认之前，所有组件内守卫和异步路由解析之后
    - 后置钩子，不接受next函数也不会改变导航本身
  - 路由独享
    - beforeEnter
  - 组件内守卫
    - beforeRouteEnter
    - beforeRouteUpdate
    - beforeRouteLeave
- 当一个导航触发时，全局前置守卫按照创建顺序调用，守卫是异步解析
- next可选，但需要确保在任何给定的路由守卫中只能调用一次

# 完整解析流程
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

# 获取数据
- 在导航完成前获取数据，beforeRouteEnter
- 在导航完成后获取数据，created钩子中