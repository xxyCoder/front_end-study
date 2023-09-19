<template>
    <h1>{{ id }} --- {{ title }}</h1>
</template>

<script setup >
const props = defineProps(['id', 'title'])
</script>