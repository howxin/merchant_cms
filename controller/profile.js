"use strict";
const {APIERRORS} = require('../lib/constants.js');
const {InvalidParams, ObjectMismatch} = require('../lib/Interrupt.js');

const router = (require('koa-router'))({prefix: '/profile'});

const BASECHECK = function (ctx, next) {
    next();
};

router.post('/getinfo', BASECHECK, async (ctx, next) => {
    let userInfo = ctx.session.get('userInfo');
    if (!userInfo)
        throw ObjectMismatch(APIERRORS.ERR_USER_NO_FOUND);
    let fields = ['id', 'nickname', 'username', 'email', 'tel', 'login_time', 'updated', 'created'];
    let userData = {};
    fields.forEach(key => userData[key] = userInfo[key]);
    ctx.res.response(userData);
    await next();
});

router.post('/updateinfo', BASECHECK, async (ctx, next) => {
    const trx = null;
    await ctx.req.validate({
        nickname: {type: 'string', min: 2, max: 20},
        email: {type: 'email'},
        tel: {type: 'number', min: 7, max: 11}
    });
    let {nickname, email, tel} = ctx.req.params;
    if (nickname || email || tel) {
        const userInfo = ctx.session.get('userInfo');
        let updateData = {};
        nickname && (nickname !== userInfo.nickname) && (updateData['nickname'] = nickname);
        email && (email !== userInfo.email) && (updateData['email'] = email);
        tel && (tel !== userInfo.tel) && (updateData['tel'] = tel);
        if (Object.keys(updateData) > 0) {
            const userModel = ctx.model('user');
            userModel.updateUserInfoById(trx, userInfo.id, updateData);
        }
    }
    await next();
});

router.post('updatepsw', async (ctx, next) => {
    const trx = null;
    await ctx.req.validate({
        password: {type: 'string', len: 40, required: true}
    });
    const userInfo = ctx.session.get('userInfo');
    const password = ctx.common.sha1(`${userInfo.username}${ctx.req.params.password}`);

    const userModel = ctx.model('user');
    userModel.updateUserInfoById(trx, userInfo.id, {password});
    await next();
});

module.exports = router;