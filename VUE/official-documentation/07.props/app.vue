<script setup>
import Comp from './Comp.vue';
import Comp1 from './Comp1.vue';
import Comp2 from './Comp2.vue';
import Comp3 from './Comp3.vue';

const post = {
    id: 1,
    title: "VUE3"
}

</script>

<template>
    <Comp foo="foo" />

    <Comp1 bar="bar" />
    <!-- 对于Boolean，指定key不给值则默认为true -->
    <Comp2 :likes="666" show />
    <Comp3 v-bind="post" />
</template>