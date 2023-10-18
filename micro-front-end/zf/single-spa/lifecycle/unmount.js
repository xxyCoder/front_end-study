import { MOUNTED, NOT_MOUNTED, UNMOUNTED } from "../application/app.helper.js"

export async function toUnloadPromise(app) {
    return Promise.resolve().then(() => {
        if (app.status !== MOUNTED) {
            return app;
        }
        app.status = UNMOUNTED;
        return app.unmounted(app.customProps).then(() => {
            app.status = NOT_MOUNTED;
        });
    })
}