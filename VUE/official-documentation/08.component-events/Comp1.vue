<template>
    <h1>{{ count }}</h1>
    <button @click="$emit('add', 1)">++1</button>
</template>

<script setup>
defineProps(['count'])
defineEmits({
    add(payload) {
        // 可实现校验，返回true表示校验通过，false表示校验失败
        // 校验失败会报警告，但是仍然执行方法
        return typeof payload === 'number';
    }
})
</script>