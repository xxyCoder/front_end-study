<template>
    <h1>xyyCoder</h1>
    <button v-bind="attrs">button</button>
</template>

<script setup>
import { useAttrs } from 'vue';

const attrs = useAttrs();
console.log(attrs)
</script>

<style scoped>
.large {
    font-size: 20px;
}
</style>