# 函数组件
- 在src目录下,创建以jsx为后缀名的文件,即创建一个组件,在组件中返回一个JSX视图
- 基于ES6 module规范
- 没有实例的概念，而是把函数执行，产生一个私有的上下文
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

# PureComponent与Component
- PureComponent默认会增加一个钩子函数shouldComponentUpdate()
  - 在此钩子函数中会对新老属性/状态进行浅比较
  - 如果没变化则不更新组件，有变化才会更新组件

# 受控组件
- 基于修改数据，让视图更新，达到效果

# 非受控组件
- 基于ref获取DOM元素，操作DOM到达效果

# ref
- 如果绑定在DOM中是字符串，则会给this.refs增加一个这样的成员，指向当前DOM
- 如果绑定在DOM中是函数，则会把函数指向，参数是当前DOM
- 如果绑定DOM中是ref对象（{current:null}），会让当前DOM对象绑定在current中
- 对于函数组件使用ref会报错（Function components cannot be given refs）
  - 配合forwardRef，获取函数子组件内部某个元素

## setState
- 第一个参数传递回调函数或对象
- 接受第二个参数（回调函数），在componentDidUpdate之后触发
- 即使shouldComponentUpdate阻止了更新，但回调函数仍然会执行
- 异步更新，多次修改视图只更新一次
  - 减少视图更新次数，降低渲染的性能消耗
  - 利用更新队列机制处理，在相同的时间段内遇到setState会立即放入更新队列当中
  - react18的setState不论任何地方执行都是异步的，而react16在基于JSX的事件绑定、生命周期函数中setState才是异步的
  - flushSync操作结束之后可以刷新update更新队列，也就是让更新队列立即执行

# 合成事件处理原理
- 不是基于addEventListener做的事件绑定，React中的合成事件都是基于事件委托处理
- 在React17之后，都是委托给#root这个容器（冒泡和捕获都做了委托）
  - 因为所有组件中渲染的内容，最后都会插入#root容器，这样点击页面中的任何一个元素，都会触发#root的触发
  - 通过event.composePath()拿到事件流对象
- React17之前，都是委托给document容器（只做了冒泡阶段的委托）
  - 通过event.composePath()拿到事件流对象
  - 在冒泡阶段将onXxx和onXxxCapture都执行
  - 为了防止每一次都重新创建出新的合成事件对象，它设置了一个事件对象池
    - 本次事件触发，获取事件操作的相关信息，从事件对象池中获取存储的合成事件对象，并赋值给相关信息
    - 等待本次操作结束，就会清空合成事件对象的相关信息，再放入对象池中
      - 意味着存在闭包，那么后续调用事件合成对象获得内部信息是null
      - event.persist()可以将合成事件的相关信息保存下来
    - reacr17之后就移除了这种做法
- 对于没有实现事件传播机制的事件，才是单独族做事件绑定（onMouseEnter或onMouseLeave等）
- 在组件渲染的时候，发现属性有onXxx或onXxxCapture这样的属性，只是将其绑定的方法赋值给元素相关的属性

# Hooks

## UseState
- 目的是在函数中使用状态，并且可以让组件更新
- 传入初始值，返回一个数组
  - 第一个是变量，值为初始值
  - 第二个是改变变量的方法，调用可以更新组件
- 第一次执行函数，产生私有上下文，执行setState传递初始值，调用改变变量方法
  - 改变状态
  - 控制视图更新
- 第二次执行函数，产生私有上下文，执行setState传递的不是初始值而是新修改的状态值，改变变量的方法也是新函数
  - 与第一次不想等，创建新的函数
```js
var _state;
function _useState(initialValue) {
    if (typeof _state === 'undefined') {
        _state = initialValue;
    }
    var _setState = function setState(value) {
      if(Object.is(value,_state)) return;
        _state = value;
        // 通知视图更新
    }

    return [_state, _setState];
}
```
- 如果传入是对象，不支持部分更新
- 执行也是异步的，采用update更新队列，实现批处理操作
- 自带性能优化  
  - 每一次修改状态的时候，会将新旧值对比（Object.is），没有改变则不更新
  - 但是改变值之后，后续再次改变为相同值也会更新一次，但也只冗余更新一次，但是不触发生命周期函数

## useEffect
- 函数组件的生命钩子函数
- 传入callback
  - 第一次渲染完毕后执行callback，可以拿到dom元素，等价于componentDidMount
  - 在组件每一次更新完也会执行callback，等价于componentDidUpdate
  - 返回一个函数，在组件释放的时候执行
    - 有一个effect列表，存放返回的函数
- 第二个参数传递数组
  - 空数组，只有第一次渲染才执行callback，等价于componentDidMount
  - 有内容则是依赖项，当依赖项中有一个改变则触发callback
- callback不能是async，因为需要返回一个函数或undefined而不是promise

## useLayoutEffect
- 用法和useEffect一样，但是在创建virtualDOM就执行回调
- useEffect会在virtualDOM创建转换为真实DOM之后挂载之前才执行回调

## useRef
- 函数组件可以使用变量+(ref) => var=ref或者React.createRef
- 在每次更新函数重新执行的时候，和之前使用的useRef对象一致，即不会重新创建
  - 而createRef每次重新创建都会新建，拿到不是之前的ref；类组件不会有这样的问题（类组件更新仅仅是将render重新执行）
  - 故对于函数组件useRef性能比createRef好

## useMemo
- 具有缓存，第一次执行函数会执行，后续只有依赖项改变才执行，类似vue的watch

## useCallback
- 具有缓存，缓存函数，如果依赖项没改变就不需要每次更新都重新创建相同的函数了
- 建议不要乱用，缓存和处理逻辑都要耗时
- 建议在父组件将函数以某个属性传递给子组件的时候可用使用useCallback包裹该函数

## 自定义Hooks
- 创建一个函数，名字需要以use开头
- use开头有自己的校验规则，只能在最外层使用，不能在条件判断中使用，如果不使用use开头则没有校验规则

# React.memo
- 对新老属性进行浅比较，和PureComponent类似

# Redux
- 创建容器的时候，存储两部分内容
- 第一部分是数据，各组件之间共享
- 第二部分是事件池，存放一些方法，可以让组件更新的方法
- redux改变组件状态不负责更新组件

# react-redux
- 不需要自己提供上下文对象了
- 使用connect(mapStateToProps,mapDispatchToProps)(Component)
  - mapStateToProps获取redux中的公共状态作为组件属性
  - mapDispatchToProps
- 不需要自己手动更新了，react-redux更改组件状态会更新组件

## redux-thunk
- 重写dispatch方法，没有type属性也不会报错，同时也不会通知reducer执行
- 实现异步，返回一个函数，内部会给这个函数增加type属性，属性值不会和reducer中的逻辑进行匹配
- 将返回的函数执行，把派发方法dispatch传递给函数
- 总共派发两次

## redux-promise
- 相比redux-thunk更方便，可以返回promise对象，但是也派发两次

## useReducer
```js
const initialState = {};
function reducer(state,action) {
  state = {...state};
  switch(action.type) {

  }
  return state;
}
const app = function() {
  const [state,dispatch] = useReducer(reducer,initialState);
}
```
- 在组件中创建局部store，适合处理大量数据

# react-router-dom
- 路径匹配规则
  - 默认非精准匹配，非完全匹配，如果地址是/login，那么路由地址/也能匹配成功，但是/a2无法匹配/a/b的；地址的最后一个/可以忽略
- 匹配子级路需要带上父级的路径，不能省略
- Route渲染组件可以拿到三个属性值：history、location、match
  - component会自动传入，如果是render则需通过回调函数传入组件
  - 函数组件可以通过useHistory、useLocation、useRouteMatch方法拿到
  - 对于在HashRoutet或BrowserRoute中渲染组件都可以使用钩子函数拿到
  - 只有基于Route渲染的组件，才可以基于props获取三个属性
    - 类组件可以通过高阶组件+钩子函数拿到三个属性，withRouter可以解决该问题
```js
function withRouter(Component) {
  return HOC(props) {
    const history = useHistory(),match = useRouteMatch(),location = useLocation;
    props = {history,match,location,...props};
    return <Component {...props} />
  }
}
```
- 动态参数/path/:param1/:param2
  - param1和param2都是动态参数
  - 隐式传递参数，路径中不会显示动态参数的值，但是可以在locaton.state中拿到，弊端是一刷新location.state也拿不到了

# NavLink vs Link
- 都是实现路由跳转的
- NavLink每一次页面加载或切换，都会拿最新的路由地址和NavLink的to指定地址匹配，匹配成功会默认设置active类名
  - 可以基于activeClass重新设定选中的active类名

# router6
- 所有路由规则都放在Routes下，且二级或多级路由匹配规则不再分配到各个组件中编写，而是统一写在一起处理
```jsx
<Routes>
  <Route path="/one" element={<A/>} >
    <Route path="/one/a" element={<Aa />} />
    <Route path="/one/b" element={<Ab />} />
  </Route>
</Routes >
```
- 路由匹配成功，不再基于component/render渲染，而是基于element
- 不再需要Switch，默认就是一个匹配成功就不继续匹配下去
- 不再需要exact，默认每一项都是精准匹配
- 原有的Redirect操作，被<Route element={<Navigate to=""/> />}取代
  - to的值可以是对象，pathname需要跳转的地址，search问号传递信息
- outlet 路由容器，用于渲染二级或多级路由匹配的规则
- 不再基于属性将history、location、match传递给组件，只能使用hooks，当hooks只能在Route内部包着使用
- 编程式导航不再通过history，而是navigator(useNavigator()方法)
```jsx
const navigator = useNavigator();
navigator("/c");
navigator("/c",{ replace: true });
navigator({
  pathname:"/c",
  search:"?name=xxyCoder"
})
navigator({
  pathname:"/c",
  state: {
    name: "xxyCoder"
  }
})
```
- 使用useSearchParams()拿到search参数
```jsx
const [params,setParams] = useSearchParams();
params.get("name");
```
- useMatch(pathname) 代替版本5的useRouteMatch（可以基于params获取路径参数匹配信息），但是这个Hooks的params不会解析