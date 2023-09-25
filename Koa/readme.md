# Koa
- 是一个包含中间件函数数组的对象，占据很小的空间，因为没有打包任何中间件
- 中间件调用next() 函数会挂起并将控制权交给下一个中间件，当下游没有中间件的时候，每个中间件恢复执行其上游行为

## 设置
- env   默认为NODE_ENV或'development'
- keys  签名为cookie密钥数组
- listen()  创建并返回一个HTTP服务器
- use(function) 给中间件函数添加到该应用
- context   是创建ctx的原型，编辑context向ctx添加属性
- on('error',(err,ctx) => {})  错误处理

## 上下文
- ctx.req   节点的request对象
- ctx.res   节点的response对象
- ctx.request   Koa的request对象
- ctx.response  Koa的response对象
- ctx.state 推荐的命名空间，用于通过中间件传递信息并将信息传递给前端视图

## 请求
- request.header    请求标头对象
- request.method    请求方法
- request.url   请求URL
- request.querystring   获取不含?的原始字符串
- request.search    获取含?的原始字符串
- request.query 获取解析的查询字符串对象

## 响应
- response.status   获取或者设置响应状态
- response.body 获取响应正文