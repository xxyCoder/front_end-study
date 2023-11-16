<script setup>
import { ref, computed } from 'vue'

const isActive = ref(true);
const classObj = {
    active: true
};
const classCom = computed(() => ({
    active: isActive
}));
const activeClass = ref('active');
const staticClass = ref('static');

const activeStyle = {
    color: 'red'
}
const staticStyle = {
    backgroundColor: '#ccc'
}
</script>
<style>
.active {
    color: red;
}

.static {
    background-color: #ccc;
}
</style>

<template>
    <div>
        <div :class="{ active: isActive }">1</div>
        <div :class="[isActive ? activeClass : '', staticClass]">Hello</div>
        <button @click="() => isActive = !isActive">active</button>
        <div :style="activeStyle">world</div>
        <div :style="[activeStyle, staticStyle]">Hello World</div>
    </div>
</template>