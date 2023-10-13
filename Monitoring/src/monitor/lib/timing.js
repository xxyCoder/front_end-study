import tracker from '../utils/tracker.js';

export function timing() {
    let FMP, LCP;
    new PerformanceObserver((entryList, observer) => {
        let perfEntries = entryList.getEntries();
        FMP = perfEntries[0];
        observer.disconnect();
    }).observe({
        entryTypes: ["element"]
    });

    new PerformanceObserver((entryList, observer) => {
        let perfEntries = entryList.getEntries();
        LCP = perfEntries[0];
        observer.disconnect();
    }).observe({
        entryTypes: ["largest-contentful-paint"]
    });

    window.addEventListener("load", (function () {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                responseStart,
                responseEnd,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart,
                domComplete
            } = window.performance.getEntries()[0];

            console.log("连接时间:", connectEnd - connectStart);
            console.log("首字节达到时间:", responseStart - requestStart);
            console.log("响应读取:", responseEnd - requestStart);
            console.log("DOM解析完成:", loadEventStart - responseEnd);
            console.log("资源加载时间:", domComplete - domContentLoadedEventEnd);
            console.log("首次交互时间:", domInteractive - fetchStart);
            console.log("完整加载时间:", loadEventStart - fetchStart);

            const log = {
                kind: "experience",
                type: "timing",
                connectTime: connectEnd - connectStart, // 连接时间
                ttfbTime: responseStart - requestStart,  // 首字节达到时间
                responseTime: responseEnd - responseStart,  // 响应读取时间
                parseDOMTime: loadEventStart - domLoading,  // DOM解析时间
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
                timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
                loadTime: loadEventStart - fetchStart,  // 完整加载时间
            }
            const FP = performance.getEntriesByName("first-paint")[0];
            const FCP = performance.getEntriesByName("first-contentful-paint")[0];
            console.log(log);
            console.log(FP, FCP, FMP, LCP);
        }, 3000);
    }))
}