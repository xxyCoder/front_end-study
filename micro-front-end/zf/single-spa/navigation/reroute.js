import { getAppChanges, shouldBeActive } from "../application/app.helper.js";
import { toBootstrapPromise } from "../lifecycle/bootstrap.js";
import { toLoadPromise } from "../lifecycle/load.js";
import { toMountPromise } from "../lifecycle/mount.js";
import { toUnloadPromise } from "../lifecycle/unmount.js";
import { started } from "../start.js";

export function reroute() {
    const { appToLoad, appToMount, appToUnmount } = getAppChanges();

    if (started) {
        return performAppChange();
    }

    function performAppChange() {
        // 将不需要的应用卸载
        const unmountPromises = Promise.all(appToUnmount.map(toUnloadPromise))
        // 加载需要的应用
        appToLoad.map(app => toLoadPromise(app).then(app => {
            // 当应用加载完毕后要启动，但是需要保证在挂载前卸载完毕老的
            return tryBootstrapAndMount(app, unmountPromises);
        }))

        function tryBootstrapAndMount(app, unmountPromises) {
            if (shouldBeActive(app)) {
                // 需要在卸载完成后挂载应用
                return toBootstrapPromise(app).then(app => unmountPromises.then(() => toMountPromise(app)));
            }
        }
    }

    // 加载应用
    Promise.all(appToLoad.map(toLoadPromise));
}