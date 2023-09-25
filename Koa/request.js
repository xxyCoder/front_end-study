const url = require('url')
const request = {
    get url() { // 不用通过原生的req
        return this.req.url;
    },
    get path() {
        return url.parse(this.req.url).pathname;
    },
    get query() {
        return url.parse(this.req.url).query;
    }
};

module.exports = request