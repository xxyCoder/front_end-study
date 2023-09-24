<script setup>
import Comp from './Comp.vue';
</script>

<template>
    <Suspense>
        <Comp />
        <template #fallback>Loading1....</template>
    </Suspense>
</template>