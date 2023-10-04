<template>
    <div @click="onClick">
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from './index.js';

const router = useRouter();
const props = defineProps({
    to: {
        type: String,
        required: true
    }
})
const onClick = () => {
    if (router.mode === "hash") {
        location.hash = "#" + props.to;
    } else {
        history.pushState({}, "", props.to)
        const popStateEvent = new PopStateEvent('popstate');
        dispatchEvent(popStateEvent);
    }
}
</script>