<template>
  {{ count }} --- {{ double }}
  <br>
  <button @click="add">同步+</button>
  <br>
  <button @click="addAsync">异步+</button>
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
    return {
      count: computed(() => store.state.count),
      double: computed(() => store.getters.double),
      add,
      addAsync
    }
  }
}
</script>