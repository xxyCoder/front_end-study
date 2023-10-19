import { getAppChanges, shouldBeActive } from "../application/app.helper.js";
import { toBootstrapPromise } from "../lifecycle/bootstrap.js";
import { toLoadPromise } from "../lifecycle/load.js";
import { toMountPromise } from "../lifecycle/mount.js";
import { toUnloadPromise } from "../lifecycle/unmount.js";
import { started } from "../start.js";
import { callCaptureEventListeners } from "./navigation-event.js";


export function reroute(event) {
    const { appToLoad, appToMount, appToUnmount } = getAppChanges();

    if (started) {
        return performAppChange();
    }

    function performAppChange() {
        // 将不需要的应用卸载
        const unmountPromises = Promise.all(appToUnmount.map(toUnloadPromise));
        // 加载需要的应用然后挂载
        const loadMountPromises = appToLoad.map(app => toLoadPromise(app).then(app => {
            // 当应用加载完毕后要启动，但是需要保证在挂载前卸载完毕老的
            return tryBootstrapAndMount(app, unmountPromises);
        }))

        // 如果应用已经加载过，那么直接挂载
        const mountPromises = Promise.all(appToMount.map(app => tryBootstrapAndMount(app, unmountPromises)));

        function tryBootstrapAndMount(app, unmountPromises) {
            if (shouldBeActive(app)) {
                // 需要在卸载完成后挂载应用
                return toBootstrapPromise(app).then(app => unmountPromises.then(() => toMountPromise(app)));
            }
        }
        return Promise.all([loadMountPromises, mountPromises]).then(() => {
            callCaptureEventListeners(event)
        })
    }
    function callEventListener() {
        callCaptureEventListeners(event)
    }
    // 加载应用
    Promise.all(appToLoad.map(toLoadPromise)).then(callEventListener);
}