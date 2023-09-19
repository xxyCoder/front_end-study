const http = require('http');

class MyXMLHttpRequest {
    constructor() {
        this.readyState = 0;
        this.headers = {};
        this.options = {};
        this.responseText = "";
        this.Async = true;
    }
    setReadyState(readyState) {
        this.readyState = readyState;
        if (this.onreadystatechange) {
            this.onreadystatechange();
        }
    }
    open(method = "GET", url, Async = true) {
        this.setReadyState(1);
        this.options.method = method
        this.options.url = url;
        this.Async = Async;
    }
    send(data) {
        this.setReadyState(2);
        const req = http.request(this.options, res => {
            res.on("data", d => {
                if (this.readyState === 2) {
                    this.setReadyState(3)
                }
                this.responseText += d;
            })
            res.on("end", () => {
                this.setReadyState(4);
            })
        })
        if (data) {
            req.write(data)
        }
        req.end();
    }
    setRequestHeader(key, value) {
        this.options[key] = value;
    }
}