"use strict";
const ModelBase = require('../lib/ModelBase.js');
const {InvalidParams} = require('../lib/Interrupt.js');
const common = require('../utils/common.js');

class Product extends ModelBase {
    constructor() {
        super();
        this.tableName = 'product';
        this.prefix = 'product'
    }

    getProductById(trx, fields = '*', id) {
        const me = this;
        return me._checkTrx(trx)
            .first(me._columnToDb(fields))
            .where(me._objectToDb({id}));
    }

    async getProductList(trx, fields = '*', cond = {}, orderBy = {'id': 'ASC'}, limit = {}) {
        const me = this;
        const db = me._checkTrx(trx);
        orderBy = me._objectToDb(orderBy);
        for (let key in orderBy) {
            db.orderBy(key, orderBy[key]);
        }
        if (limit.hasOwnProperty('size') && limit.hasOwnProperty('page')) {
            let {size, page} = limit;
            db.limit(size).offset((page - 1) * size);
        }
        return db.select(me._columnToDb(fields))
            .where(me._objectToDb(cond));
    }

    getProductsByTypeId(trx, fields = '*', typeId) {
        const me = this;
        return me._checkTrx(trx)
            .select(me._columnToDb(fields))
            .where(me._objectToDb({typeid: typeId}));
    }

    updateProductById(trx, id, params = {}) {
        const me = this;
        let data = Object.assign({updated: common.now()}, params);
        return me._checkTrx(trx)
            .update(me._objectToDb(data))
            .where(me._objectToDb({id}));
    }

    addProduct(trx, params, returning = ['id']) {
        const me = this;
        const now = Date.now();
        const data = Object.assign({updated: now, created: now}, params);
        return me._checkTrx(trx)
            .returning(me._columnToDb(returning))
            .insert(me._objectToDb(data));
    }

    delProductById(trx, id) {
        const me = this;
        return me._checkTrx(trx)
            .where(me._objectToDb({id}))
            .del();
    }
}

module.exports = new Product();