<template>
  <form-input pattern="[0-9]*" message="必须都为数字" width="300px" height="50px" prefix="Search" suffix=".com"/>
  <br/>
  <form-input type="password" width="300px" height="50px" prefix="Search" suffix=".com" :clear="true"/>
</template>

<script setup lang="ts">
import formInput from './components/form/Input.vue'
</script>