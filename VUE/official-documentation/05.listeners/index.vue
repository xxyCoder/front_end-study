<script setup>
import { ref, computed, watch, reactive } from 'vue'

const age = ref(21);
const name = ref("xxyCoder");
const count = ref(0);
const intro = computed(() => { return `my name is ${name.value}, age is ${age.value}` });
const obj = reactive({
    cnt: 0
});

watch(age, (newAge, oldAge) => {
    console.log(oldAge, "==>", newAge)
})
watch([age, name], ([newAge, newName], [oldAge, oldName]) => {
    console.log(oldAge, '==>', newAge);
    console.log(oldName, "==>", newName)
})
watch(intro, (newIntro, oldIntro) => {
    console.log(oldIntro, '==>', newIntro);
})
watch(() => count.value, (newValue, oldValue) => {
    console.log(oldValue, '==>', newValue);

})
// 不能直接监听响应式对象的原始数据类型属性，
watch(() => obj.cnt, (newCnt, oldCnt) => {
    console.log(oldCnt, '==>', newCnt);
})
watch(obj.x, (newX, oldX) => {
    console.log(oldX, "->", newX);
})
// 如果是getter返回对象，那么需要替换这个对象才能触发watch 
watch(() => obj.x, (newX, oldX) => {
    console.log(oldX, "->", newX);
}, { deep: true })  // 添加deep 为true则可以避免问题
// 传入一个响应式对象，会隐式创建一个深层监听器
watch(obj, (newObj, oldObj) => {
    console.log(oldObj, "==>", newObj);
});

</script>

<template>
    <button @click="++count">++count</button>
    <br />
    <button @click="++age">++age</button>
    <h1>{{ intro }}</h1>
    <button @click="++obj.cnt">++ cnt</button>
    <br />
    <button @click="++obj.x.y">++ y</button>
    <h2>{{ obj }}</h2>
</template>