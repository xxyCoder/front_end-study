<template>
    <div>
        login
        <ul>
            <li>{{ route.query.name }}</li>
            <li>{{ route.query.price }}</li>
            <li>{{ route.query.id }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts" >
import { useRoute } from 'vue-router';
const route = useRoute();

</script>