<script setup>
import { ref } from 'vue'

const show = ref(true);
const items = ref([1, 2, 3, 4])
let idx = 5;
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) { }

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el) { }

// 当进入过渡在完成之前被取消时调用
function onEnterCancelled(el) { }

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) { }

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) { }

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) { }
</script>

<template>
    <button @click="show = !show">Toggle</button>
    <Transition>
        <p v-if="show">hello</p>
    </Transition>
    <Transition name="bounce">
        <p v-if="show" style="text-align: center;">Hello here is some bouncy text!</p>
    </Transition>
    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter"
        @enter-cancelled="onEnterCancelled" @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave"
        @leave-cancelled="onLeaveCancelled">
        <!-- ... -->
    </Transition>
    <TransitionGroup name="list" tag="ul">
        <li v-for="item in items" :key="item">
            {{ item }}
        </li>
    </TransitionGroup>
    <button @click="items.unshift(idx++)">+items</button>
    <button @click="items.shift()">-items</button>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

@keyframes bounce {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(2);
    }

    100% {
        transform: scale(1)
    }
}

.bounce-enter-active {
    animation: bounce 1s;
}

.bounce-leave-active {
    animation: bounce 1s reverse;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
    position: absolute;
}
</style>