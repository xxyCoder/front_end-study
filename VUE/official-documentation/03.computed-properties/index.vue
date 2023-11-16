<script setup>
import { ref, computed } from 'vue'

const count1 = ref(0);
const count2 = ref(0);
const double = computed({
    get() {
        console.log(count2.value, "get");
        return count1.value * 2;
    },
    set(newValue) {
        count1.value = newValue;
    }
})
let dt = double;
console.log(dt === double);
</script>

<template>
    <div>
        {{ count2 }} --- {{ double }}
        <button @click="() => count1++">+1</button>
        <button @click="() => { count2++; console.log(dt === double); }">+2</button>
    </div>
</template>