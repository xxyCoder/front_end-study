# 函数组件
- 在src目录下,创建以jsx为后缀名的文件,即创建一个组件,在组件中返回一个JSX视图
- 基于ES6 module规范
- 渲染机制
  1. 基于babel-preset-react-app把调用的组件转换为createElement格式
  2. 执行createElement,创建virtualDOM
    ```js
    {
        $$typeof: Symbol(react.element),
        key: null,
        props: {},
        ref: null,
        type: DemoOne
    }
    ```
  3. 基于root.render把虚拟DOM变为真是DOM
     - type是函数
     - 把props作为实参传递给函数
     - 此时把函数执行
     - 接收函数执行结果,最后基于render把虚拟DOM变为真实DOM

# props
- 只读,不可修改,修改则报错
- 被冻结,不能增删改成员,也不能对成员做劫持(defineProperty)
- 被密封,不能增删成员,也不能对成员做劫持
- 不可扩展是只不能增加成员
- 可以对props属性设置校验,不论成功还是失败,都正常运行,失败则报警告
  - 设置默认值 函数组件.defaultProps = {}
  - 设置其他规则    依赖第官方插件 prop-types