import { reroute } from "./reroute.js";

// 对用户路径切换进行监听，重新调用reroute方法
function urlRoute(event) {
    console.log(window.location.hash);
    reroute(event);
}
window.addEventListener("hashchange", urlRoute);
window.addEventListener("popstate", urlRoute);

// 劫持原生路由，保证加载完后切换路由
const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;
const listentingTo = ["hashchange", "popstate"];
const capturedEventListeners = {
    hashchange: [],
    popstate: []
};

window.addEventListener = function (eventName, callback) {
    if (listentingTo.includes(eventName) && !capturedEventListeners[eventName].some(listener => listener !== callback)) {
        return capturedEventListeners[eventName].push(callback);
    }
    return originalAddEventListener.apply(this, arguments);
}

window.removeEventListener = function (eventName, callback) {
    if (listentingTo.includes(eventName)) {
        return capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(fn => fn !== callback);
    }
    return originalRemoveEventListener.apply(this, arguments);
}

export function callCaptureEventListeners(event) {
    if (event && listentingTo.includes(event.type)) {
        capturedEventListeners[event.type].forEach(fn => fn.apply(this, event));
    }
}

function patchFn(updateState, methodMethod) {
    return function () {
        const urlBase = window.location.href;
        const r = updateState.apply(this, arguments);
        const urlAfter = window.localStorage.href;
        if (urlBase !== urlAfter) {
            window.dispatchEvent(new PopStateEvent("popstate"));
        }

        return r;
    }
}

window.history.pushState = patchFn(window.history.pushState, "pushState");
window.history.replaceState = patchFn(window.history.replaceState, "replaceState");