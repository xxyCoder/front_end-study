function runCountDown(time, args, runingCb, endCb) {
    const worker = new Worker("./worker.js")
    const seconds = 1000,
        minute = 60 * seconds,
        hour = 60 * minute,
        day = 24 * hour;

    worker.postMessage(time);
    worker.addEventListener("message", function (e) {
        if (typeof e.data === 'string') {
            worker.terminate()
            endCb && endCb()
        } else {
            const result = {};
            let date = e.data;
            args && args.forEach(arg => {
                if (arg === 'day') {
                    result.day = Math.floor(date / day);
                    date -= result.day * day;
                } else if (arg === 'hour') {
                    result.hour = Math.floor(date / hour);
                    date -= result.hour * hour;
                } else if (arg === 'minute') {
                    result.minute = Math.floor(date / minute);
                    date -= result.minute * minute;
                } else if (arg === 'seconds') {
                    result.seconds = Math.floor(date / seconds);
                }
            })
            runingCb && runingCb(result);
        }
    })
    worker.onerror = function (e) {
        console.log('err')
    }
}
const timer = document.getElementById("timer");
runCountDown(24 * 60 * 60 * 1000 * 2, ["day", "hour", "minute", "seconds"], function (result) {
    let str = "";
    if (result.day) {
        str += `${result.day}天`
    }
    if (result.hour) {
        str += `${result.hour}时`
    }
    if (result.minute) {
        str += `${result.minute}分`
    }
    if (result.seconds) {
        str += `${result.seconds}秒`
    }
    timer.innerText = str;
})