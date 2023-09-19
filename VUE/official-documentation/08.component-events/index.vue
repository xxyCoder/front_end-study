<script setup>
import { ref } from 'vue';
import Comp from './Comp.vue';
import Comp1 from './Comp1.vue';
const count = ref(0);
const add = (v) => {
    count.value += v;
}
</script>

<template>
    <Comp :count="count" @add="add" />
    <Comp1 :count="count" @add="add" />
</template>