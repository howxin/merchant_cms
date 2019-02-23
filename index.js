"use strict";
const http = require('http');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./lib/config.js');
const controller = require('./lib/controller.js');
const { ERRORS } = require('./lib/constants.js');
const request = require('./middlewares/request.js');
const response = require('./middlewares/response.js');
const Session = require('./middlewares/session.js');
const common = require('./utils/common.js');

const ENV = process.ENV || 'local';
const APPNAME = process.APPNAME || 'default';

// 设置项目配置
const envconf = require(path.join(__dirname, `./config/envconf/${ENV}_${APPNAME}.json`));
const descriptor = {
    'koa-logger': { type: 'boolean', required: true },
    server: {
        type: 'object',
        required: true,
        fields: {
            ip: { type: 'string', required: true },
            port: { type: 'number', required: true },
        }
    },
};
common.validate(descriptor, envconf).then(() => {
    try {
        config.set(envconf);
        const app = new Koa();
        console.log(app)
        // app.keys = ['some secret hurr'];
        app.context.model = require('./lib/model.js');
        app.context.common = require('./utils/common.js');
        app.context.config = config;

        // logger
        app.use(async (ctx, next) => {
            await next();
            const rt = ctx.response.get('X-Response-Time');
            (config['koa-logger']) && console.log(`${ctx.method} ${ctx.url} - ${rt}`);
        });

        // x-response-time
        app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
        });

        // bodyParser
        app.use(bodyParser());

        // request
        app.use(request);

        // response
        app.use(response);

        // session
        app.use(Session(app, config['session']));

        app.use(async (ctx, next) => {
            ctx.dbTrx = null;
            await next();

        });

        // controller(app);
        app.use((require('./controller/login.js').routes()));
        app.use((require('./controller/profile.js').routes()));

        // error handler
        app.on('error', (err, ctx) => {
            console.error('catch error =>', err);
            ctx.response.status = 200;
            console.log(err.output);
            // ctx.response.body = err.hasOwnProperty('optput') && err.output();
        });

        // start server
        const server = http.createServer(app.callback()).on('error', err => {
            if (err.code === 'EADDRINUSE') {
                console.error('端口被占用，请释放端口或者更改其他端口。');
            } else {
                console.error('createServer catch error =>', err);
            }
        });
        const { ip, port } = config['server'];
        server.listen(port, ip, () => {
            console.log(`listening ip[${ip}] port[${port}]`);
        });
    } catch (err) {
        console.error(err);
    }
}).catch(err => {
    console.error(`server catch error => ${ERRORS.ERR_INIT_LOST_CONFIG}, reason => ${JSON.stringify(err)}`);
    process.exit(-1);
});

process.on('uncaughtException', e => {
    console.error(`caught uncaughtException =>  ${e.stack}`);
});
process.on('unhandledRejection', (reason, promise) => {
    promise.catch(e => {
        console.error(`Unhandled Rejection at =>  Promise error stack =>  ${e.stack}, reason =>  ${JSON.stringify(reason)}`);
    });
});