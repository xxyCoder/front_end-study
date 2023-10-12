import tracker from '../utils/tracker.js';

export function injectXHR() {
    let XMLHttpRequest = window.XMLHttpRequest;
    const oldOpen = XMLHttpRequest.prototype.open;
    const oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url, async) {
        if (!url.match(/logstores/)) {
            this.logDate = {
                method,
                url,
                async
            };

            return oldOpen.apply(this, arguments);
        }
    }
    let startTime;
    XMLHttpRequest.prototype.send = function (body) {
        console.log("send")
        if (this.logDate) {
            startTime = Date.now();

            function handler(type) {
                return (event) => {
                    let duration = Date.now() - startTime;
                    let status = this.status;
                    let statusText = this.statusText;

                    tracker.send({
                        kind: "stability",
                        type: "xhr",
                        eventType: event.type,
                        pathname: this.logDate.url,
                        status: status + "-" + statusText,
                        duration,
                        response: this.response ? JSON.stringify(this.response) : '',
                        params: body || ""
                    })
                }
            }

            this.addEventListener("load", handler("load"), false);
            this.addEventListener("abort", handler("abort"), false);
            this.addEventListener("error", handler("error"), false);
        }
        return oldSend.apply(this, arguments);
    }
}