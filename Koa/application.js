const http = require('http');
const EventEmitter = require('events');
const context = require('./context')
const request = require('./request')
const response = require('./response')
const Stream = require('stream')

class Koa extends EventEmitter {
    constructor() {
        super();
        this.fn = null;
        this.context = context;
        this.request = request;
        this.response = response;
        this.middlewares = [];
    }
    createContext(req, res) {
        const ctx = Object.create(this.context);
        const request = ctx.request = Object.create(this.request);
        const response = ctx.response = Object.create(this.response);

        ctx.req = request.req = response.req = req;
        ctx.res = request.res = response.res = res;
        request.ctx = response.ctx = ctx;
        request.response = response;
        response.request = request;

        return ctx;
    }
    handleRequest(req, res) {
        res.statusCode = 404
        const ctx = this.createContext(req, res)
        const fn = this.compose(this.middlewares, ctx)
        fn.then(() => { // then了之后再进行判断
            if (typeof ctx.body == 'object') {
                res.setHeader('Content-Type', 'application/json;charset=utf8')
                res.end(JSON.stringify(ctx.body))
            } else if (ctx.body instanceof Stream) {
                ctx.body.pipe(res)
            }
            else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
                res.setHeader('Content-Type', 'text/htmlcharset=utf8')
                res.end(ctx.body)
            } else {
                res.end('Not found')
            }
        }).catch(err => { // 监控错误发射error，用于app.on('error', (err) =>{})
            this.emit('error', err)
            res.statusCode = 500
            res.end('server error')
        })
    }
    use(fn) {
        // this.fn = fn;
        this.middlewares.push(fn);
    }
    compose(middlewares, ctx) {
        function dispatch(index) {
            if (index === middlewares.length) return;   // 最后一次next不能执行
            const middleware = middlewares[index];
            // 包装成异步
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
        }
        return dispatch(0)
    }
    listen(...args) {
        // const server = http.createServer(this.fn);
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args)
    }
}

module.exports = Koa;