import { apps } from "./app.js";

export const NOT_LOADED = "NOT_LOADED";
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE"    // 路径匹配，将要开始加载资源
export const LOAD_ERROR = "LOAD_ERROR"; // 加载错误

// 启动的过程
export const NOT_BOOTSTRAP = "NOT_BOOTSTRAP";   // 资源加载完毕，需要启动，此时还未启动
export const BOOTSTRAPING = "BOOTSTRAPING"; // 启动中

// 挂载过程
export const NOT_MOUNTED = "NOT_MOUNTED";   // 没有挂载
export const MOUNTING = "MOUNTING"; // 挂载中
export const MOUNTED = "MOUNTED";   // 挂载完成

// 卸载过程
export const UNMOUNTED = "UNMOUNTED";   // 卸载中

export function isActive(app) {
    return app.status === MOUNTED;
}

export function shouldBeActive(app) {
    return app.activeWhen(window.location);
}

export function getAppChanges() {
    const appToLoad = [];
    const appToMount = [];
    const appToUnmount = [];

    apps.forEach(app => {
        const appShouleBeActive = shouldBeActive(app);
        switch (app.status) {
            case NOT_LOADED:
            case LOADING_SOURCE_CODE:
                if (appShouleBeActive) {
                    appToLoad.push(app);
                }
                break;
            case NOT_BOOTSTRAP:
            case BOOTSTRAPING:
            case NOT_MOUNTED:
                if (appShouleBeActive) {
                    appToMount.push(app);
                }
                break;
            case MOUNTED:
                if (!appShouleBeActive) {   // 当前app已经挂载，但是不是激活态则需要卸载
                    appToUnmount.push(app);
                }
                break;
            default: break;
        }
    })

    return { appToLoad, appToMount, appToUnmount };
}