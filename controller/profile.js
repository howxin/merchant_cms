"use strict";
const { APIERRORS } = require('../lib/constants.js');
const { InvalidParams, ObjectMismatch, SessionExpired, AccessDenied } = require('../lib/Interrupt.js');

const router = (require('koa-router'))({ prefix: '/profile' });

const BASECHECK = async function (ctx, next) {
    if (ctx.response.status === 404)
        ctx.response.status = 200;
    let userInfo = ctx.session.get('userInfo');
    if (!userInfo)
        throw new SessionExpired(APIERRORS.ERR_SESSION_EXPIRED);
    else if (userInfo['status'] !== 1)
        throw new AccessDenied();

    let ttl = userInfo['session_expire'] - Date.now();
    if (ttl < 0)
        throw new SessionExpired();
    if (ttl > ctx.config['session']['maxAge'] || ttl < ctx.config['session']['minAge']) {
        await ctx.model('user').updateSessionById(null, userInfo['id'], userInfo['session_id'], ctx.common.range());
    }
    return next();
};

router.post('/getinfo', BASECHECK, async (ctx, next) => {
    let userInfo = ctx.session.get('userInfo');
    if (!userInfo)
        throw ObjectMismatch(APIERRORS.ERR_USER_NO_FOUND);
    let fields = ['id', 'nickname', 'username', 'email', 'tel', 'login_time', 'updated', 'created'];
    let userData = {};
    fields.forEach(key => userData[key] = userInfo[key]);
    ctx.responseData(userData);
    return next();
});

router.post('/updateinfo', BASECHECK, async (ctx, next) => {
    const trx = null;
    await ctx.req.validate({
        nickname: { type: 'string', min: 2, max: 20 },
        email: { type: 'email' },
        tel: { type: 'string', min: 7, max: 11 }
    });

    let { nickname, email, tel } = ctx.req.params;
    if (nickname || email || tel) {
        const userInfo = ctx.session.get('userInfo');
        let updateData = {};
        nickname && (nickname !== userInfo.nickname) && (updateData['nickname'] = nickname);
        email && (email !== userInfo.email) && (updateData['email'] = email);
        tel && (tel !== userInfo.tel) && (updateData['tel'] = tel);
        if (Object.keys(updateData).length > 0) {
            await ctx.model('user').updateUserInfoById(trx, userInfo.id, updateData);
            ctx.session.set('userInfo', Object.assign(userInfo, updateData));
        }
    }
    return next();
});

router.post('updatepsw', BASECHECK, async (ctx, next) => {
    const trx = null;
    await ctx.req.validate({
        password: { type: 'string', len: 40, required: true }
    });

    const userInfo = ctx.session.get('userInfo');
    const password = ctx.common.sha1(`${userInfo.username}${ctx.req.params.password}`);
    ctx.model('user').updateUserInfoById(trx, userInfo.id, { password });
    return next();
});

module.exports = router;