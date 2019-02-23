"use strict";
const { APIERRORS } = require('../lib/constants.js');
const { InvalidParams, InvalidRequest, ObjectMismatch } = require('../lib/Interrupt.js');

const router = (require('koa-router'))({ prefix: '/product' });

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
    if (ttl > ctx.config['session']['maxAge'] || ttl < ctx.config['session']['minAge'])
        await ctx.model('user').updateSessionById(ctx.dbTrx, userInfo['id'], userInfo['session_id'], ctx.common.range());
    return next();
};

router.post('/gettypelist', BASECHECK, async (ctx, next) => {
    let fields = ['id', 'name', 'created'];
    let cond = { status: 1 };
    let productTypes = await ctx.model('product_type').getProductTypeList(ctx.dbTrx, fields, cond, { id: 'ASC' });
    ctx.responseData(productTypes);
    return next();
});

router.post('/addtype', BASECHECK, async (ctx, next) => {
    await ctx.req.validate({
        typeid: { type: 'integer', required: true }
    });
    let productTypeModel = ctx.model('product_type');
    let { typeid } = ctx.req.params;
    let type = await productTypeModel.getProductTypeByName(ctx.dbTrx, ['id', 'name', 'status'], { id: typeid });
    if (!!type) {
        if (type.status === 1) {
            throw InvalidParams(APIERRORS.ERR_INVALID_PARAMS);
        } else {
            await productTypeModel.updateProductTypeById(ctx.dbTrx, type.id, { status: 1 });
        }
    } else {
        await productTypeModel.addProductType(ctx.dbTrx, { name, status: 1 });
    }
    return next();
});

router.post('/deltype', BASECHECK, async (ctx, next) => {
    await ctx.req.validate({
        typeid: { type: 'integer', required: true }
    });
    let { typeid } = ctx.req.params;
    let type = await ctx.model('product_type').getProductTypeById(ctx.dbTrx, ['id', 'name', 'status'], { id: typeid });
    if (!type || type.status !== 1) {
        throw InvalidParams(APIERRORS.ERR_INVALID_PARAMS);
    }
    let used = await ctx.model('product').getProductsByTypeId(ctx.dbTrx, ['id'], typeid);
    if (used.length > 0) {
        throw InvalidRequest(APIERRORS.ERR_PRODUCT_TYPE_USED);
    }
    await ctx.model('product_type').updateProductTypeById(ctx.dbTrx, typeid, { status: 0 });
    return next();
});

router.post('/updatetype', BASECHECK, async (ctx, next) => {
    await ctx.req.validate({
        typeid: { type: 'integer', required: true },
        name: { type: 'string', min: 1, max: 20, required: true }
    });
    let productTypeModel = ctx.model('product_type');
    let { typeid, name } = ctx.req.params;
    let typeInfo = await productTypeModel.getProductTypeById(ctx.dbTrx, ['name'], typeid);
    if (!typeInfo) {
        throw ObjectMismatch(APIERRORS.ERR_PRODUCT_TYPE_NOT_FOUND);
    }
    if (typeInfo.name !== name) {
        await productTypeModel.updateProductTypeById(ctx.dbTrx, typeid, { name });
    }
    return next();
});

router.post('/getproductlist', BASECHECK, async (ctx, next) => {
    await ctx.req.validate({
        typeid: { type: 'integer' },
        name: { type: 'string', min: 1, max: 20 },
        page: { type: 'integer' },
        size: { type: 'integer' }
    });
    let otherTableMap = {
        type: {}
    };
    let {typeid, name, page=1, size=20} = ctx.req.params;
    let fields = ['id', 'typeid', 'vendorid', 'serial_number', 'name', 'price', 'unit', 'size', 'color', 'status', 'cost', 'number', 'notes'];
    let conds = {};
    (!ctx.common.empty(name)) && (conds.name = name);
    (!ctx.common.empty(typeid)) && (conds.typeid = typeid);
    let products = await ctx.model('product').getProductList(ctx.dbTrx, fields, conds, null, {page, size});
    if (products.length > 0) {
        let map = {typeIds: [], vendorIds: []};
        products.forEach(({typeid, vendorid}) => {
            (!map.typeIds.includes(typeid)) && map.typeIds.push(typeid);
            (!map.vendorIds.includes(vendorid)) && map.vendorIds.push(vendorid);
        });
        await ctx.model('product_type').getProductTypesByIds(ctx.dbTrx, ['id', 'name'], map.typeIds);
    }
    ctx.responseData(products);
    return next();
});

router.post('/addproduct', async (ctx, next) => {

});

router.post('/delproduct', async (ctx, next) => {

});

router.post('/updateproduct', async (ctx, next) => {

});

module.exports = router;