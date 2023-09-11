# 模板语法
## 文本插值
- {{  }} 大括号语法 被解释为纯文本，如果需要插入html，则需要v-html指令
  - {{}} 可以使用JS表达式
- v-bind 给属性绑定变量，{{ }} 语法不能在html attribute中使用
  - v-bind:attr="val"   绑定单个属性
  - v-bind="obj"    绑定多个属性