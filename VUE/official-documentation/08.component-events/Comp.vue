<template>
    <h1>{{ count }}</h1>
    <button @click="$emit('add', 1)">++1</button>
</template>

<script setup>
defineProps(['count'])
defineEmits(['add'])
</script>