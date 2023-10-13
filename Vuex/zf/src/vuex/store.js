import ModuleCollection from "./module-collection";

function installModule(store, rootState, path, module) {
    const isRoot = !path.length;

    if (!isRoot) {
        const parentState = path.slice(0, -1).reduce((state, key) => state[key], rootState);
        parentState[path[path.length - 1]] = module.state;
    }

    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(key), child);
    });
}

export default class Store {
    constructor(options) {
        const store = this;
        store._modules = new ModuleCollection(options);

        const state = store._modules.root.state;
        installModule(store, state, [], store._modules.root);
        console.log(state)
    }
    install(app, injectKey = "store") {
        app.provide(injectKey, this);
        app.config.globalProperties.$store = this;  // 增添$store属性
    }
    
    // 防止用户解构丢失this
    commit = (type, payload) => {
        this._mutations[type](payload);
    }
    dispatch = (type, payload) => {
        this._actions[type](payload);
    }
}
