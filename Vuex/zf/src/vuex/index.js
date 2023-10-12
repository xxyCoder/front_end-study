import { inject, reactive } from "vue";

export function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key));
}

class Store {
    constructor(options) {
        const store = this;
        store._state = reactive({ data: options.state });
        const _getters = options.getters;
        const _mutations = options.mutations;
        const _actions = options.actions;

        store.getters = {};
        forEachValue(_getters, (fn, key) => {
            Object.defineProperty(store.getters, key, {
                get: () => fn(store.state)  // vuex中不能使用computed，如果组件销毁了会移除计算属性，在vue3.2改bug
            })
        });

        // 没有原型链，原型方法也不存在
        store._mutations = Object.create(null);
        store._actions = Object.create(null);

        forEachValue(_mutations, (mutation, key) => {
            store._mutations[key] = (payload) => {
                mutation.call(store, store.state, payload);
            }
        })
        forEachValue(_actions, (action, key) => {
            store._actions[key] = (payload) => {
                action.call(store, store, payload);
            }
        })
    }
    install(app, injectKey = "store") {
        app.provide(injectKey, this);
        app.config.globalProperties.$store = this;  // 增添$store属性
    }
    get state() {
        return this._state.data;
    }
    // 防止用户解构丢失this
    commit = (type, payload) => {
        this._mutations[type](payload);
    }
    dispatch = (type, payload) => {
        this._actions[type](payload);
    }
}

export function createStore(options) {
    return new Store(options);
}

export function useStore(injectKey = "store") {
    return inject(injectKey);
}