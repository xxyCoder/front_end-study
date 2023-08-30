<template>
    <ul>
        <li>{{ route.params.name }}</li>
        <li>{{ route.params.price }}</li>
        <li>{{ route.params.id }}</li>
    </ul>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute();

</script>