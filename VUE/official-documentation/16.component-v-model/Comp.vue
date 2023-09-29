<script setup>
const props = defineProps({
    modelValue: String,
    modelModifiers: { default: () => ({}) },
    title: String,
    titleModifiers: { default: () => ({}) }
})

defineEmits(['update:modelValue', 'update:title'],)

</script>

<template>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <div>{{ modelModifiers }} --- {{ modelValue }}</div>
    <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
    <div>{{ titleModifiers }} --- {{ title }}</div>
</template>