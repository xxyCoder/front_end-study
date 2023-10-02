<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')

await new Promise(resolve => {
    setTimeout(() => {
        msg.value = "xxyCoder";
        resolve();
    }, 3000);
})
</script>

<template>
    <h1>{{ msg }}</h1>
    <input v-model="msg">
</template>