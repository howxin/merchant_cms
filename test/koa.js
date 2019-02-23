const http = require('http');
const Koa = require('koa');
const app = new Koa();

app.use(function(ctx, next) {
    next();
});

const server = http.createServer(app.callback()).on('error', err => {
    if (err.code === 'EADDRINUSE') {
        console.error('端口被占用，请释放端口或者更改其他端口。');
    } else {
        console.error('createServer catch error =>', err);
    }
});

server.listen(3001, () => {
    // console.log(`listening ip[${ip}] port[${port}]`);
});