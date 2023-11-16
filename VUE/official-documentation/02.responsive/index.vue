<script setup>
import { ref, reactive } from 'vue'
const data = { count: 1 };
const msg = ref('Hello World!')
const obj0 = ref({ name: "xxyCoder" });
obj0.value.data = data;
const objRaw = { msg: "Hello" };
const obj1 = reactive({ msg: "Hello" });
const obj2 = reactive(objRaw);
const obj3 = reactive({});
console.log(reactive(objRaw) === obj2);
const proxy = reactive({})

const raw = {}
proxy.nested = raw
proxy.count = 1;

console.log(proxy.nested === raw) // false
</script>

<template>
    <h1>{{ proxy.count }}</h1>
    <button @click="() => ++proxy.count">++</button>
    <h1>{{ obj0.data.count }}</h1>
    <button @click="() => ++obj0.data.count">++</button>
</template>