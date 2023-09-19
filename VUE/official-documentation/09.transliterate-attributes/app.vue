<script setup>
import Comp from './Comp.vue';
import Comp1 from './Comp1.vue';

const click = () => {
    console.log('click')
}
</script>

<template>
    <Comp class="comp" @click="click" />
    <Comp1 class="comp" @click="click" />
</template>

<style scoped>
.btn {
    border: none;
}

.comp {
    color: red;
}
</style>