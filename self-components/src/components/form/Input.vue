<template>
    <div class="input-box" :style="{ width: width, height: height }">
        <span v-if="prefix">{{ prefix }}</span>
        <input @invalid="onInvalid" :pattern="pattern" :type="inputType" ref="inputRef" :disabled="disabled"
            @blur="onBlur" />
        <clear-icon class="input-content__clear" v-show="clear" @click="onClear" />
        <Transition mode="out-in">
            <eye-icon @click="passwordShow = true" v-if="type === 'password' && !passwordShow" />
            <eye-close-icon @click="passwordShow = false" v-else-if="type === 'password' && passwordShow" />
        </Transition>
        <span v-if="suffix">{{ suffix }}</span>
    </div>
    <div :style="{ width: width }" class="promt-box" v-show="promtShow">{{ message }}</div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, defineExpose } from 'vue'
import ClearIcon from '../svg/ClearIcon.vue'
import EyeIcon from '../svg/EyeIcon.vue'
import EyeCloseIcon from '../svg/EyeCloseIcon.vue'

const props = defineProps({
    width: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    prefix: String,
    suffix: String,
    clear: Boolean,
    type: {
        type: String,
        default: "text"
    },
    pattern: String,    // 匹配正则
    message: String // 错误提示信息
})
const inputRef = ref();

const passwordShow = ref(false);
const promtShow = ref(false)
const inputType = computed(() => props.type !== "password" ? props.type : (passwordShow.value ? "text" : "password"))
const onClear = () => {
    inputRef.value.value = "";
}
const onBlur = () => {
    if (inputRef.value.validity.patternMismatch) {
        promtShow.value = true;
    } else {
        promtShow.value = false;
    }
}
const onInvalid = () => {
    // 定制校验失败的报错信息
    inputRef.value.setCustomValidity(props.message);
}

defineExpose({
    inputRef,
    onClear
})
</script>

<style lang="less">
.input-box {
    display: flex;
    align-items: center;
    border: 1px solid #000;
    justify-content: space-between;
    font-size: 14px;

    input {
        border: none;
        flex: 1;
        outline: none;
        padding-left: 3px;
    }

    span {
        padding: 0 3px;
    }

    .input-content__clear,
    .input-content__show {
        padding-right: 3px;
        opacity: 0;
        transition: opacity 0.5s linear;
    }

    &:hover {

        .input-content__clear,
        .input-content__show {
            opacity: 1;
        }
    }

    input[type="password"]::-ms-reveal {
        display: none; // 去掉自带的小眼睛
    }
}

.promt-box {
    color: red;
    font-size: 12px;
    text-align: center;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s linear;
}
</style> 