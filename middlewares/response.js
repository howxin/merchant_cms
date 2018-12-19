"use strict";
const { APIERRORS } = require('../lib/constants.js');
const { InternalError } = require('../lib/Interrupt.js');
const common = require('../utils/common.js');

module.exports = async function (ctx, next) {
    try {
        ctx.state.data = {};
        ctx.responseData = (key, value) => {
            if (value === undefined && common.typeOf(key) !== 'object') {
                throw new InternalError('responseData parameter not valid');
            }
            if (value === undefined) {
                Object.assign(ctx.state.data, key);
            } else {
                Object.assign(ctx.state.data, { [key]: value });
            }
        };
        await next();
        if (ctx.response.status === 404) {
            ctx.body = {
                status: 'error',
                errcode: APIERRORS.ERR_METHOD_NOT_FOUND,
                errmsg: 'method no found'
            }
        } else {
            ctx.body = !!ctx.body ? ctx.body : {
                status: 'ok',
                data: ctx.state.data
            }
        }
    } catch (err) {
        console.error('error =>', err);
        // 设置状态码为 200 - 服务端错误
        ctx.status = 200;
        // 输出详细的错误信息
        if (err && err.output) {
            ctx.body = err.output();
        } else {
            ctx.body = {
                status: 'error',
                errcode: APIERRORS.ERR_UNKNOWN_ERROR,
                errmsg: err.message,
                extra: err.stack
            }
        }
    }
};