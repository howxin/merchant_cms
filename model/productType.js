"use strict";
const ModelBase = require('../lib/ModelBase.js');
const {InvalidRequest} = require('../lib/Interrupt.js');
const {APIERRORS} = require('../lib/constants.js');

class ProductType extends ModelBase {
    constructor() {
        super();
        this.tableName = 'product_type';
        this.prefix = 'product_type'
    }

    getProductTypeById(trx, fields = '*', id) {
        const me = this;
        return me._checkTrx(trx)
            .first(me._columnToDb(fields))
            .where(me._objectToDb({id}));
    }

    getProductTypeList(trx, fields = '*', cond, orderBy = {'id': 'ASC'}, limit) {
        const me = this;
        let db = me._checkTrx(trx);
        for (let key in orderBy) {
            db.orderBy(key, orderBy[key]);
        }
        if (limit.hasOwnProperty('size') && limit.hasOwnProperty('page')) {
            let {size, page} = limit;
            db.limit(size).offset((page - 1) * size);
        }
        return db
            .select(me._columnToDb(fields))
            .where(me._objectToDb({cond}));
    }

    updateProductTypeById(trx, id, params = {}) {
        const me = this;
        let data = Object.assign({updated: Date.now()}, params);
        return me._checkTrx(trx)
            .update(me._objectToDb(data))
            .where(me._objectToDb({id}));
    }

    addProductType(trx, params, returning = ['id']) {
        const me = this;
        const now = Date.now();
        const data = Object.assign({updated: now, created: now}, params);
        return me._checkTrx(trx)
            .returning(me._columnToDb(returning))
            .insert(me._objectToDb(data));
    }

    async delProductTypeById(trx, id) {
        const me = this;
        const productModel = me.model('product');
        let products = await productModel.getProductsByTypeId(trx, ['id'], id);
        if (products.length > 0)
            throw new InvalidRequest(APIERRORS.ERR_PRODUCT_TYPE_IN_USE);
        return me._checkTrx(trx)
            .where(me._objectToDb({id}))
            .del();
    }
}

module.exports = new ProductType();