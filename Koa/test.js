const Koa = require('./application')
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(1)
    await next()
    console.log(2)
})
app.use(async (ctx, next) => {
    console.log(3)
    let p = new Promise((resolve, roject) => {
        setTimeout(() => {
            console.log('3.5')
            resolve()
        }, 1000)
    })
    await p.then()
    await next()
    console.log(4)
    ctx.body = 'hello world'
})

app.use(async (ctx) => {
    console.log(ctx.request.path, ctx.request.query, ctx.request.url);
    console.log(ctx.path, ctx.query, ctx.url)
})

app.listen(3000)