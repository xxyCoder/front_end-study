# 自定义指令
- 一个自定义指令由一个包含类似组件生命周期的对象来定义
- 在 script setup中，任何以v开头的驼峰命名的变量都可以被用作一个自定义指令
- 在没有用到 script setup中，需要directives选项注册
- 钩子参数
  - el 指令绑定的元素，可以直接操作DOM
  - binding 一个对象
    - value v-my-directives="1 + 1" value = 2
    - oldValue  仅仅在beforeUpdate和update中可以使用
    - arg 传递给指令的参数  v-my-directive:foo arg = foo
    - modifiers 一个包含修饰符的对象    v-my-directive.foo.bar  modifier = { foo:true, bar: true }
- 应用到组件上，和透传attributes类似，但是用在多根节点指令会被忽略并报错