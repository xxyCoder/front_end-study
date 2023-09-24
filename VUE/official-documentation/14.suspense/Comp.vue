<template>
    <h1>{{ message }}</h1>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    async setup() {
        const message = ref("");
        await new Promise(resolve => {
            setTimeout(() => {
                message.value = "Hello Subspense";
                resolve();
            }, 3000)
        })
        return {
            message
        }
    }
})
</script>