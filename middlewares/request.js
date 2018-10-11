"use strict";
const {APIERRORS} = require('../lib/constants.js');
const {InvalidParams} = require('../lib/Interrupt.js');
const common = require('../utils/common.js');

module.exports = async function (ctx, next) {
    ctx.req.params = Object.assign({}, ctx.query, ctx.request.body);
    ctx.req.validate = async (descriptor, options) => {
        try {
            await common.validate(descriptor, ctx.req.params, options);
        } catch (err) {
            throw new InvalidParams(APIERRORS.ERR_INVALID_PARAMS, err);
        }
    };
    await next();
};