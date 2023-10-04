import { ref, inject } from 'vue'
import RouterView from './RouterView'
import RouterLink from './RouterLink'
const ROUTER_KEY = '__router__';


function createWebHashHistory() {
    function bindEvents(fn) {
        window.addEventListener("hashchange", fn);
    }
    return {
        bindEvents,
        url: window.location.hash.slice(1) || "/",
        mode: "hash"
    };
}

function createWebHistory() {
    function bindEvents(fn) {
        window.addEventListener("popstate", fn);
    }
    return {
        bindEvents,
        url: window.location.pathname,
        mode: "history"
    }
}

class Router {
    constructor(options) {
        this.history = options.history;
        this.routes = options.routes;
        this.current = ref(this.history.url);

        if (this.history.mode === "hash") {
            this.history.bindEvents(() => {
                this.current.value = window.location.hash.slice(1)
            })
        } else {
            this.history.bindEvents(() => {
                this.current.value = window.location.pathname;
            })
        }
    }
    install(app) {
        app.provide(ROUTER_KEY, this);
        app.component("router-view", RouterView);
        app.component("router-link", RouterLink);
    }
}

function createRouter(options) {
    return new Router(options);
}

function useRouter() {
    return inject(ROUTER_KEY);
}

export {
    createRouter,
    createWebHistory,
    createWebHashHistory,
    useRouter
}