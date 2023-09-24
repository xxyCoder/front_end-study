<script setup>
import { ref } from 'vue'
import MyModal from './MyModal.vue'

const used = ref(true)
</script>

<template>
    <h3>Teleport</h3>
    <div>
        <MyModal :used="used" />
    </div>
    <button @click="used = !used">disabled?</button>
</template>