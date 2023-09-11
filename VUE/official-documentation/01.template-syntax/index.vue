<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
const rawHtml = "<h2>Hello html</h2>";
const dynamicId = ref("myId");
const dynamicObj = reactive({
    class: "myClass",
    id: "myId"
})
</script>

<template>
    <div>
        <h1>{{ rawHtml }}</h1>
        <input v-model="msg">
        <div v-html="rawHtml"></div>
        <div v-bind:id="dynamicId"></div>
        <div v-bind="dynamicObj"></div>
    </div>
</template>