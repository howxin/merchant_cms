"use strict";
const {APIERRORS} = require('../lib/constants.js');
const {InvalidParams, ObjectMismatch} = require('../lib/Interrupt.js');

const router = (require('koa-router'))({prefix: '/product'});

const BASECHECK = function (ctx, next) {

};

router.post('/gettypelist', async (ctx, next) => {

});

router.post('/addtype', async (ctx, next) => {

});

router.post('/deltype', async (ctx, next) => {

});

router.post('/updatetype', async (ctx, next) => {

});

router.post('/getproductlist', async (ctx, next) => {

});

router.post('/addproduct', async (ctx, next) => {

});

router.post('/delproduct', async (ctx, next) => {

});

router.post('/updateproduct', async (ctx, next) => {

});

module.exports = router;