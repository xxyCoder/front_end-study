import getLastEvent from '../utils/getLastEvent.js'
import getSelector from '../utils/getSelector.js';
import tracker from '../utils/tracker.js';

export function injectJsError() {
    window.addEventListener('error', (e) => {
        // 脚本错误
        if (e.target && (e.target.src || e.target.href)) {
            tracker.send({
                kind: 'stability',
                type: 'error',
                errorType: 'resourceError',
                filename: e.target.src || e.target.href,
                tagName: 'script',
                stack: getLines(e.error.stack),
                selector: lastEvent ? getSelector(lastEvent.composedPath()) : ''
            })
        }
        const lastEvent = getLastEvent();
        const log = {
            kind: 'stability',  // 监控大指标
            type: 'error',  // 小类型，是个错误
            errorType: 'jsError',   // JS执行错误
            message: e.message, // 报错信息
            filename: e.filename,
            position: `${e.lineno}:${e.colno}`,
            stack: getLines(e.error.stack),
            selector: lastEvent ? getSelector(lastEvent.composedPath()) : ''
        }
        tracker.send(log);
    });

    window.addEventListener("unhandledrejection", (e) => {
        const lastEvent = getLastEvent();
        const reason = e.reason;
        let filename;
        let line;
        let column;
        if (reason.stack) {
            const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
            filename = matchResult[1];
            line = matchResult[2];
            column = matchResult[3]
        }

        tracker.send({
            kind: 'stability',
            type: 'error',
            errorType: 'promiseError',
            message: e.message,
            filename: e.filename,
            position: `${e.lineno}:${e.colno}`,
            stack: getLines(e.error.stack),
            selector: lastEvent ? getSelector(lastEvent.composedPath()) : ''
        })
    }, true);

    function getLines(stack) {
        return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join("^");
    }
}