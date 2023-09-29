# 透传Attributes
- 是指传递给一个组件，该组件却没有将其声明为props或emits
- 禁用attributes 开启inheritAttrs: false
  - 在defineOptions({})的对象中设定
- 多根节点的继承需要手动绑定