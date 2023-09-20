<script setup>
import { ref } from 'vue'
import Comp from "./Comp.vue"
import Comp1 from "./Comp1.vue"
</script>

<template>
    <Comp />
    <Comp1>
        放头部也分配到default内容中
        <template v-slot:header="{ message, count }">
            Header ==> {{ message }} {{ count }}
            <br />
        </template>

        Default
        <template #footer>
            Footer
            <br />
        </template>
        也是被分配到default内容中
        <br />
    </Comp1>
</template>