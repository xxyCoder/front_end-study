import { createStore } from '../vuex'

function customPlugin(store) {
  console.log("customPlugin", store);
  const local = localStorage.getItem("VuexState");
  if (local) {
    store.replaceState(JSON.parse(local));
  }
  store.subscribe((mutation, state) => {
    localStorage.setItem("VuexState", JSON.stringify(state));
  }) // 调用mutations改变状态就会触发该事件
}

export default createStore({
  plugins: [  // 按照注册的顺序依次执行，执行的时候会将store作为参数传递
    customPlugin
  ],
  strict: true, // 不允许用户非法更改状态，只能在mutations中修改状态
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
    aCount: {
      namespaced: true,
      state: {
        count: 0
      },
      mutations: {
        add(state, payload) {
          state.count += payload;
        }
      },
      modules: {
        cCount: {
          namespaced: true,
          state: {
            count: 0
          },
          mutations: {
            add(state, payload) {
              state.count += payload;
            }
          }
        }
      }
    },
    bCount: {
      namespaced: true,
      state: {
        count: 0
      },
      mutations: {
        add(state, payload) {
          state.count += payload;
        }
      }
    }
  }
})
