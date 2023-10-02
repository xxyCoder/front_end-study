<script setup>
import Comp from './Comp.vue';
import Comp1 from './Comp1.vue';
</script>

<template>
    <Suspense>
        <Comp />
        <template #fallback>Loading2....</template>
    </Suspense>
    <Suspense>
        <Comp1 />
        <template #fallback>Loading1....</template>
    </Suspense>
</template>