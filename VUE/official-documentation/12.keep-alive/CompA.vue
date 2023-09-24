<script setup>
import { onMounted, ref } from 'vue'

const count = ref(0)
import { onActivated, onDeactivated } from 'vue'

onMounted(() => {
    console.log('onMounted');
})

onActivated(() => {
    // 调用时机为首次挂载
    // 以及每次从缓存中被重新插入时
    console.log("onActivated")
})

onDeactivated(() => {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
    console.log("onDeactivated")
})
</script>

<template>
    <p>Current component: A</p>
    <span>count: {{ count }}</span>
    <button @click="count++">+</button>
</template>
