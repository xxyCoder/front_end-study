import { createStore } from '../vuex'

export default createStore({
  state: {
    count: 0
  },
  getters: {
    double(state) {
      return state.count * 2;
    }
  },
  mutations: {
    add(state, payload) {
      state.count += payload;
    }
  },
  actions: {
    addAsync({ commit, dispatch }, payload) {
      setTimeout(() => {
        commit("add", payload);
      }, 2000);
    }
  },
  modules: {
  }
})
