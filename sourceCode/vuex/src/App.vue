<template>
  {{ count }} --- {{ double }}
  <br>
  <button @click="add">同步+</button>
  <br>
  <button @click="addAsync">异步+</button>
  <hr>
  a模块: {{ aCount }}
  <button @click="addA">++a</button>
  <br>
  b模块: {{ bCount }}
  <button @click="addB">++b</button>
  <br>
  c模块: {{ cCount }}
  <button @click="addC">++c</button>
</template>

<script>
import { useStore } from './vuex';
import { computed } from 'vue'

export default {
  name: "App",
  setup() {
    const store = useStore();

    function add() {
      store.commit("add", 1);
    }
    function addAsync() {
      store.dispatch("addAsync", 1);
    }
    function addA() {
      store.commit("aCount/add", 1);
    }
    function addB() {
      store.commit("bCount/add", 1);
    }
    function addC() {
      store.commit("aCount/cCount/add", 1);
    }
    return {
      count: computed(() => store.state.count),
      double: computed(() => store.getters.double),
      aCount: computed(() => store.state.aCount.count),
      bCount: computed(() => store.state.bCount.count),
      cCount: computed(() => store.state.aCount.cCount.count),
      add,
      addAsync,
      addA,
      addB,
      addC
    }
  }
}
</script>