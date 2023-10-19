import { registerMicroApps, start } from 'qiankun';

const loader = (loading) => {
    console.log("加载状态:", loading);
}

registerMicroApps([
    {
        name: "reactApp",
        entry: "//localhost:10000",
        activeRule: "/react",   // 当路径是/react的时候启动
        container: "#container",    // 应该挂载的位置
        loader
    },
    {
        name: "vueApp",
        entry: "//localhost:20000",
        activeRule: "/vue",
        container: "#container",
        loader
    },
    {
        name: "staticApp",
        entry: "//localhost:30000",
        activeRule: "/static",
        container: "#container",
        loader
    }
], {
    beforeLoad() {
        console.log("beforeLoad");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    afterMount() {
        console.log("afterMount");
    },
    beforeUnmount() {
        console.log("beforeUnmount");
    },
    afterUnmount() {
        console.log("afterUnmount");
    }
})

start();