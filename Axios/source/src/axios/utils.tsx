export function extend(a: any, b: any, context: any) {
    for (const key of Reflect.ownKeys(b)) {
        if (b.hasOwnProperty(key)) {
            if (typeof b[key] === 'function') {
                a[key] = b[key].bind(context);
            } else {
                a[key] = b[key];
            }
        }
    }
}