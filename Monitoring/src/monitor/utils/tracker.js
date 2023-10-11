const userAgent = require('user-agent')

const host = "cn-beijing.log.aliyuncs.com";
const project = "Monitoring";
const logStore = "Monitoring-store";

function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent)
    }
}

class SendTracker {
    constructor() {
        this.url = `${project}.${host}/logstores/${logStore}/track`;  // 上报的路径
        this.xhr = new XMLHttpRequest();
    }
    send(data = {}) {
        const extractData = getExtraData();
        const log = { ...extractData, ...data };

        // 对象的值不能是数字
        for (const key in log) {
            if (typeof log[key] === 'number') {
                log[key] = String(log[key]);
            }
        }

        this.xhr.open("POST", this.url, true);
        const body = JSON.stringify(data);

        this.xhr.setRequestHeader("x-log-apiversion", "0.6.0");
        this.xhr.setRequestHeader("x-log-bodyrawsize", body.length);

        this.xhr.onload = () => { };
        this.xhr.onerror = () => { };
        this.send(body);
    }
}

export default new SendTracker();