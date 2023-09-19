<template>
    <h1 v-show="show">{{ title }} --- {{ likes }}</h1>
</template>

<script setup >
const props = defineProps({
    title: {
        type: String,
        default(rawProps) {
            console.log(rawProps);
            return "xxyCoder";
        }
    },
    likes: {
        type: Number,
        required: true,
        default: 100
    },
    show: Boolean,
    auth: {
        validator(value) {
            return ['success', 'warning', 'danger'].includes(value)
        }
    }
})
</script>