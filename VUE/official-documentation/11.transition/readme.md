# 过渡
- Transition 是内置组件，由v-if、v-show、component动态切换组件、改变key属性触发
- v-enter-from ---> v-enter-active ---> v-enter-to
- v-leave-to ---> v-leave-active ---> v-leave-from
- name属性声明过渡名，默认是v

## 自定义过渡class
- enter-from-class  
- enter-active-class
- enter-to-class
- leave-from-class
- leave-to-class
- leave-active-class

## JS钩子
- before-enter
- enter
- after-enter
- enter-cancelled
- before-leave
- leave
- after-leave
- leave-cancalled
- 对于enter和leave中，回调函数done是必须的

## 其他属性
- apear 某个节点初次渲染就应用过渡效果
- mode  过渡模式
- :css  显示向Vue表示可以跳过CSS过渡的自动探测

## transition发生插入或移除
- 检测是否有动画或过渡
- 检测是否有钩子函数
- 没有动画、过渡和钩子，那么DOM的插入、删除操作将在浏览器的下一个动画帧执行

## transition和transition-group区别
- 默认情况下，tg不会渲染一个容器元素，但是可以通过tag指定一个元素作为容器元素来渲染
- 过渡模式不可用
- 列表每个元素都必须有第一无二的key
- CSS过渡会应用到列表内元素而不是容器元素