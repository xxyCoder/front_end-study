<template>
    <button @click="open = true">open modal</button>
    <Teleport to="body">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
    used: {
        type: Boolean,
        required: true
    }
})
const open = ref(false);
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
}
</style>