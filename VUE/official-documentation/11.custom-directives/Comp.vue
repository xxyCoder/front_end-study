<script setup>
// 在模板中启用 v-focus
const vFocus = {
    mounted: (el) => el.focus()
}
</script>

<template>
    <input v-focus />
</template>