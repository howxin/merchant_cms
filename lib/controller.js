"use strict";
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const common = require('../utils/common.js');

// 解析规则 {'GET /': homepage}
function add_rule(opts) {
    const router = new Router();
    const {prefix, rule} = opts;

    router.prefix(prefix);
    for (let key in rule) {
        for (let method of ['GET ', 'POST ']) {
            if (key.startsWith(method)) {
                let path = key.substring(method.length);
                let fn = rule[key];
                if (common.typeOf(fn) === 'function') {
                    router[method.trim().toLowerCase()](path, fn);
                } else if (common.typeOf(fn) === 'array') {
                    router[method.trim().toLowerCase()](path, ...fn);
                } else {
                    throw new Error('ERR_INVALID_FN_TYPE');
                }
            }
        }
    }
    return router;
}

//自动导入controller文件夹下所有的路由规则
function add_rules() {
    // 得到 /controller 所有以js结尾的文件
    let files = fs.readdirSync(path.join(__dirname, '../controller'));
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    const data = [];
    // 添加规则
    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let options = require(path.join(__dirname, `../controller/${f}`));
        let router = add_rule(options);
        data.push(router);
    }
    return data;
}

module.exports = function (app) {
    let routers = add_rules();
    routers.forEach(r => {
       app.use(r.routes());
    });
};