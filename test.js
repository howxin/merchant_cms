const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const app = new Koa();
app.use(async (ctx, next) => {
    await next();
});


const server = http.createServer(app.callback()).on('error', err => {
    if (err.code === 'EADDRINUSE') {
        console.error('端口被占用，请释放端口或者更改其他端口。');
    } else {
        console.error('createServer catch error =>', err);
    }
});

server.listen(4000, () => {
    console.log(`listening ip[${4000}]`);
});"use strict";