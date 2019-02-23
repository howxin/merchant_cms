"use strict";
const { APIERRORS } = require('../lib/constants.js');
const { InvalidParams, ObjectMismatch } = require('../lib/Interrupt.js');

const router = (require('koa-router'))({ prefix: '/login' });

const BASECHECK = function (ctx, next) {
    if (ctx.response.status === 404)
        ctx.response.status = 200;
    return next();
};

router.post('/userlogin', BASECHECK, async (ctx, next) => {
    await ctx.req.validate({
        username: { type: 'string', min: 2, max: 10, required: true },
        password: { type: 'string', len: 40, required: true }
    });
    let { username, password } = ctx.req.params;
    const userModel = ctx.model('user');
    password = ctx.common.sha1(`${username}${password}`);
    let userInfo = await userModel.getUserInfoByUsernameAndPsw(ctx.dbTrx, '*', { username, password });
    if (!userInfo)
        throw new InvalidParams(APIERRORS.ERR_INVALID_USERNAME_OR_PASSWORD);

    let sessionId = ctx.common.genCode(40);
    let sessionExpired = Date.now() + ctx.config['session']['maxAge'];
    await userModel.userLogin(ctx.dbTrx, userInfo['id'], sessionId, sessionExpired);
    ctx.session.update(ctx, { sessionId });
    ctx.session.set('userInfo', userInfo);

    let fields = ['id', 'nickname', 'username', 'email', 'tel', 'login_time', 'updated', 'created'];
    let userData = {};
    fields.forEach(key => userData[key] = userInfo[key]);
    ctx.responseData(userData);
    return next();
});

router.post('/userlogout', (ctx, next) => {
    ctx.session.destroy();
    return next();
});

module.exports = router;