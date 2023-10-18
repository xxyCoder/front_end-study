import { LOADING_SOURCE_CODE, NOT_BOOTSTRAP, NOT_LOADED } from "../application/app.helper.js"

function flattenArrayToPromise(fns) {
    fns = Array.isArray(fns) ? fns : [fns];
    return function (props) {
        return fns.reduce((rPromise, fn) => rPromise.then(() => fn(props)), Promise.resolve());
    }
}

export function toLoadPromise(app) {
    return Promise.resolve().then(() => {
        if (app.status !== NOT_LOADED) {
            return app;
        }
        app.status = LOADING_SOURCE_CODE;
        return app.loadApp(app.customProps).then(v => {
            const { bootstrap, mount, unmount } = v;
            app.status = NOT_BOOTSTRAP;
            app.bootstrap = flattenArrayToPromise(bootstrap);
            app.mount = flattenArrayToPromise(mount);
            app.unmount = flattenArrayToPromise(unmount);
            return app;
        });
    })
}

