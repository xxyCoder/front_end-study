<script setup>
import { ref, onMounted } from 'vue'

const input = ref(null);
const itemsRef = ref(null)
const funcRef = ref(null);
onMounted(() => {
  input.value.focus()
  console.log(itemsRef);
  console.log(funcRef)
  funcRef.value.focus()
})

</script>

<template>
  <input ref="input" />
  <ul>
    <li v-for="items in 3" ref="itemsRef"></li>
  </ul>
  <input :ref="(el) => { funcRef = el }" />
</template>