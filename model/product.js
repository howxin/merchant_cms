"use strict";
const ModelBase = require('../lib/ModelBase.js');

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

    async getProductList(trx, fields = '*', cond, orderBy = {'id': 'ASC'}, limit) {
        const me = this;
        await me._checkTrx(trx)
            .select(me._columnToDb(fields))
            .where(me._objectToDb(cond));
    }

    updateProductById(trx, id, params = {}) {
        const me = this;
        let data = Object.assign({updated: Date.now()}, params);
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