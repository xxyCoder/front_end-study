<script setup>
import { ref, computed } from 'vue'

const isActive = ref(false);
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
    position: 'static'
}
</script>

<template>
    <div>
        <div :class="{ active: isActive }"></div>
        <div :class="classObj"></div>
        <div :class="classCom"></div>
        <div :class="[activeClass, staticClass]"></div>
        <div :class="[isActive ? active : '', staticClass]" :style="[activeStyle, staticStyle]"></div>
    </div>
</template>