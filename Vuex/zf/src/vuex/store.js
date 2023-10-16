import { reactive, watch } from "vue";
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
    if (store._commiting) {
        enableStrictMode();
    }
}

function enableStrictMode(store) {
    watch(() => store._state.data, () => {
        console.assert(store._commiting, '不能更改vuex的状态在mutations之外');
    }, { deep: true, flush: "sync" });
}

export default class Store {
    constructor(options) {
        const store = this;
        store._modules = new ModuleCollection(options);
        store._wrappedGetters = Object.create(null);
        store._mutations = Object.create(null);
        store._actions = Object.create(null);

        this.strict = options.strict || false;
        // 调用mutations监控该状态，确保是在mutations中更改状态，故mutations是同步执行
        this._commiting = false;

        const state = store._modules.root.state;
        installModule(store, state, [], store._modules.root);

        resetStoreState(store, state);

        store._subscribes = [];
        options.plugins && options.plugins.forEach(plugin => plugin(store));
    }

    _withCommiting(fn) {
        const commiting = this._commiting;
        this._commiting = true;
        fn();
        this._commiting = commiting;
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
        this._withCommiting(() => {
            entry.forEach(handler => handler(payload));
        });
        this._subscribes.forEach(sub => sub({ type, payload }, this.state));
    }

    dispatch = (type, payload) => {
        const entry = this._actions[type] || [];
        return Promise.all(entry.map(handler => handler(payload)));
    }

    replaceState(newState) {
        this._withCommiting(() => {
            // 这就是为什么在reactive中需要data属性，就不需要重新用reactive包裹一遍了
            this._state.data = newState;
        })
    }

    subscribe(fn) {
        this._subscribes.push(fn);
    }
}
