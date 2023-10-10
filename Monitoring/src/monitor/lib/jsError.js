import getLastEvent from '../utils/getLastEvent.js'
import getSelector from '../utils/getSelector.js';

export function injectJsError() {
    window.addEventListener('error', (e) => {
        const lastEvent = getLastEvent();
        let log = {
            kind: 'stability',  // 监控大指标
            type: 'error',  // 小类型，是个错误
            errorType: 'jsError',   // JS执行错误
            url: '',    // 访问哪个路径报错
            message: e.message, // 报错信息
            filename: e.filename,
            position: `${e.lineno}:${e.colno}`,
            stack: getLines(e.error.stack),
            selector: lastEvent ? getSelector(lastEvent.composedPath()) : ''
        }

        console.log("log", log)
    })

    function getLines(stack) {
        return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join("^");
    }
}