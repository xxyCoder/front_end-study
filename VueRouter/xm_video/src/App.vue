<template>
  <div>
    <router-view></router-view>
    <button @click="toPageByUrl('login')">去login</button>
    <button @click="toPageByName('Login')"></button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

type Item = {
  name: string;
  price: number;
  id: number;
}
// 编程式路由导航
const toPageByUrl = (url: string) => {
  router.push({ path: url })
}
const toPageByName = (name: string) => {
  router.push({
    name
  })
}
const next = () => {
  router.go(1);
  // 等价于
  router.forward();
}
const back = () => {
  router.go(-1);
  router.back()
}
// 传递参数
const toLogin = (item: Item) => {
  router.push({
    path: '/login',
    query: item
  })
}
const toAbout = (item: Item) => {
  router.push({
    path: '/about',
    params: {
      id: item.id,
    }
  })
}

</script>

<style></style>