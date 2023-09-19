<template>
    <button class="large btn">{{ $attrs }}</button>
</template>

<script setup>
defineOptions({
    inheritAttrs: false
})
</script>

<style scoped>
.large {
    font-size: 20px;
}
</style>