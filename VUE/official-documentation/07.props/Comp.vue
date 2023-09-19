<template>
    Hello,{{ foo }}
</template>

<script setup >
const props = defineProps(['foo'])
console.log(props.foo)
</script>