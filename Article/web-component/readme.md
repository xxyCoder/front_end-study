# Web Component
## 自定义元素
- customElements.define()告诉标签与那个类关联
- 类需要继承HTMLElement

## Shadow DOM
- WebComponent允许内部代码隐藏起来，即这部分DOM默认和外部DOM隔离，内部代码无法影响外部代码
- attachShadow()开启Shadow DOM
- mode
  - open表示可以通过实例的shadowRoot拿到
  - closed则无法拿到

## 生命周期
- connectedCallback 当元素首次插入文档DOM树触发
- disconnectedCallback  当元素从文档DOM中删除被触发
- adoptedCallback   当元素被移动到新文档时触发
- attributeChangedCallback  当元素增加、删除、修改自身属性时触发