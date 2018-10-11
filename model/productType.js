"use strict";
const ModelBase = require('../lib/ModelBase.js');

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
        try {
            let db = me._checkTrx(trx);
            for (let key in orderBy) {
                db.orderBy(key, orderBy[key]);
            }
            return db
                .select(me._columnToDb(fields))
                .where(me._objectToDb({cond}));
        } catch (err) {
            throw err;
        }
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

    delProductTypeById(trx, id) {
        const me = this;

    }
}

module.exports = new ProductType();