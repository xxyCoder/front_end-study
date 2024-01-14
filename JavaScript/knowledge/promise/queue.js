const browserWindow = (typeof window !== 'undefined') ? window : undefined;
const browserGlobal = browserWindow || {};
const BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
const isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
const isWorker = typeof Uint8ClampedArray !== 'undefined' &&
    typeof importScripts !== 'undefined' &&
    typeof MessageChannel !== 'undefined';

const queue = new Array(1000);
function flush() {
    for (let i = 0; i < len; i += 2) {
        let callback = queue[i];
        let arg = queue[i + 1];
        callback(arg);
        queue[i] = queue[i + 1] = undefined;
    }
    len = 0;
}

let len = 0, scheduleFlush;

if (isNode) {
    scheduleFlush = () => process.nextTick(flush);
} else if (BrowserMutationObserver) {
    let cnt = 0;
    const observer = new BrowserMutationObserver(flush)
    const node = document.createTextNode('');
    observer.observer(node, { characterData: true });
    scheduleFlush = () => { node.data = (cnt + 1) % 2 };
} else if (isWorker) {
    const channel = new MessageChannel();
    channel.port1.onmessage = flush;
    scheduleFlush = () => channel.port2.postMessage(0);
} else {
    scheduleFlush = () => setTimeout(flush, 0);
}

export function asap(callback, arg) {
    queue[len++] = callback;
    queue[len++] = arg;
    if (len === 2) scheduleFlush()
}