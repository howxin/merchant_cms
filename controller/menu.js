"use strict";
const {APIERRORS} = require('../lib/constants.js');
const {InvalidParams, ObjectMismatch} = require('../lib/Interrupt.js');

const router = (require('koa-router'))({prefix: '/menu'});

const BASECHECK = function (ctx, next) {

};

router.post('/getmenulist', async (ctx, next) => {

});

module.exports = router;