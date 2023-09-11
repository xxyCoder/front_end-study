<script setup>
import { ref, computed } from 'vue'

const firstname = "xxy";
const lastname = "Coder";

const fullname = computed({
    get() {
        return firstname.value + ' ' + lastname.value;
    },
    set(newValue) {
        [firstname.value, lastname.value] = newValue.split(' ');
    }
})
</script>

<template>
    <div>

    </div>
</template>