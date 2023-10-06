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
        type: DemoOne(函数即函数名)
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

# 类组件
- 继承React.Component
- 需要有render方法,返回一个JSX视图
- 虚拟DOM
```js
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {},
  ref: null,
  type: Class Vote
}
```
- 每次调用都是new一个新的实例对象
- 传递props挂载自身
  - 需要constructor构造函数中调用super,将props挂载到this实例上
  - 或者不写constructor,React也会自动挂载到this实例上
- 状态初始化  this.state
- 重新渲染视图  
  - this.setState
  - this.forceUpdate()  强制更新

# 生命周期函数
## 挂载钩子函数
- componentWillMount()   不安全
- render()
  - 子组件componentWillMount()
  - 子组件render()
  - 子组件componentDidMount()
- componentDidMount()

## 更新钩子函数
- shouldComponentUpdate() 
  - 对于forceUpdate会跳过该钩子函数，进入下一步
- componentWillUpdate() 不安全
- render()
  - 子组件shouldComponentUpdate()
  - 子组件componentWillUpdate()
  - 子组件render()
  - 子组件componentDidUpdate()
- componentDidUpdate()

## 卸载钩子函数
- componentWillUnmount()  