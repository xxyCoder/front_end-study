<template>
    <div>
        <slot name="header" :count="count" :message="message"></slot>
        <slot></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref("Hello Vue");
const count = ref(0);
</script>