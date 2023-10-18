import { BOOTSTRAPING, NOT_BOOTSTRAP, NOT_MOUNTED } from "../application/app.helper.js";

export async function toBootstrapPromise(app) {
    return Promise.resolve().then(() => {
        if (app.status !== NOT_BOOTSTRAP) {
            return app;
        }
        app.status = BOOTSTRAPING;
        return app.bootstrap(app.customProps).then(() => {
            app.status = NOT_MOUNTED;
            return app;
        });
    })
}