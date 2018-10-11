"use strict";
const {APIERRORS} = require('../lib/constants.js');
const {InvalidParams, ObjectMismatch} = require('../lib/Interrupt.js');

const router = (require('koa-router'))({prefix: '/user'});

const BASECHECK = function (ctx, next) {

};



module.exports = router;