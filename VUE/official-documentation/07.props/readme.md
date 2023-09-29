# Props
- 所有props都是可选的，除非声明required: true
- 除Boolean（false），其余都有默认值undefined
- 单项数据流，每次父组件更新prop，所有的子组件的props都会被更新到最新值

## 细节
- 所有Prop默认可选
- 除Boolean类型外,未传递的可选prop将会有默认值undefined,Boolean属性则是false
- 如果声明了default值,那么prop无论是显示指定undefined还是未赋值都会改为default值
- 当prop校验失败,Vue会抛出警告