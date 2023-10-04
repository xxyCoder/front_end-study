import { inject, reactive } from 'vue'
const STORE_KEY = '__store__';

function useStore() {
    return inject(STORE_KEY);
}

class Store {
    constructor(options) {
        this._state = reactive({
            ...typeof options.state === 'function' ? options.state() : options.state
        });
        options.getters && Object.getOwnPropertyNames(options.getters).forEach(key => {
            this._getter[key] = computed(() => options.getters[key](this.state));
        })
        this._mutations = options.mutations;
        this._actions = options.actions;
    }
    install(app) {
        app.provide(STORE_KEY, this);
    }
    get state() {
        return this._state;
    }
    get getters() {
        return this._getter;
    }
    commit(type, payload) {
        const entry = this.mutations[type];
        entry && entry(this.state, payload);
    }
    dispatch(type, payload) {
        const entry = this.actions[type];
        entry && entry({ commit: this.commit }, payload);
    }
}

function createStore(options) {
    return new Store(options);
}

export {
    createStore,
    useStore
}