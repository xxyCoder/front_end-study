<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue';

const msg = ref('Hello World!')
const title = ref("Hello");
</script>

<template>
    <Comp v-model.capitalize="msg" v-model:title.once="title" />
</template>