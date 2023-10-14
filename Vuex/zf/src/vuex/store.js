import { reactive } from "vue";
import ModuleCollection from "./module/module-collection";
import { forEachValue, isPromise } from "./utils";

function getNestedState(state, path) {
    return path.reduce((s, k) => s[k], state);
}

function installModule(store, rootState, path, module) {
    const isRoot = !path.length;

    const namesspaced = store._modules.getNamespaced(path);

    if (!isRoot) {
        const parentState = path.slice(0, -1).reduce((state, key) => state[key], rootState);
        parentState[path[path.length - 1]] = module.state;
    }

    module.forEachGetter((getter, key) => {
        // 直接使用模块的state是不可行的，因为模块的state不是响应式
        store._wrappedGetters[namesspaced + key] = () => getter(getNestedState(store.state, path));
    });

    module.forEachMutation((mutation, key) => {
        const entry = store._mutations[namesspaced + key] || (store._mutations[namesspaced + key] = []);
        entry.push((payload) => mutation.call(store, getNestedState(store.state, path), payload))
    });

    // action与mutation的第一个区别是，action返回promise
    module.forEachAction((action, key) => {
        const entry = store._actions[namesspaced + key] || (store._actions[namesspaced + key] = []);
        entry.push((payload) => {
            const res = action.call(store, store, payload);
            if (!isPromise(res)) {
                return Promise.resolve(res);
            } else {
                return res;
            }
        })
    });

    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(key), child);
    });
}

function resetStoreState(store, state) {
    store._state = reactive({ data: state });
    const wrappedGetters = store._wrappedGetters;
    store.getters = {};
    forEachValue(wrappedGetters, (getter, key) => {
        Object.defineProperty(store.getters, key, {
            get: () => getter(),
            enumerable: true
        })
    });
}

export default class Store {
    constructor(options) {
        const store = this;
        store._modules = new ModuleCollection(options);
        store._wrappedGetters = Object.create(null);
        store._mutations = Object.create(null);
        store._actions = Object.create(null);

        const state = store._modules.root.state;
        installModule(store, state, [], store._modules.root);

        resetStoreState(store, state);

        console.log(store)
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
        const entry = this._mutations[type] || [];
        entry.forEach(handler => handler(payload));
    }
    dispatch = (type, payload) => {
        const entry = this._actions[type] || [];
        return Promise.all(entry.map(handler => handler(payload)));
    }
}
