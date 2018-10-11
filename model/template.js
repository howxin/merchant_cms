"use strict";
const ModelBase = require('../lib/ModelBase.js');

class Template extends ModelBase {
    constructor() {
        super();
        this.tableName = 'table_name';
        this.prefix = 'table_prefix'
    }

    get_XXX_ById(trx, fields = '*', id) {
        const me = this;
        return me._checkTrx(trx)
            .first(me._columnToDb(fields))
            .where(me._objectToDb({id}));
    }

    async get_XXX_List(trx, fields = '*', cond, orderBy = {'id': 'ASC'}, limit) {
        const me = this;
        return me._checkTrx(trx)
            .select(me._columnToDb(fields))
            .where(me._objectToDb(cond));
    }

    update_XXX_ById(trx, id, params = {}) {
        const me = this;
        let data = Object.assign({updated: Date.now()}, params);
        return me._checkTrx(trx)
            .update(me._objectToDb(data))
            .where(me._objectToDb({id}));
    }

    add_XXX_(trx, params, returning = ['id']) {
        const me = this;
        const now = Date.now();
        const data = Object.assign({updated: now, created: now}, params);
        return me._checkTrx(trx)
            .returning(me._columnToDb(returning))
            .insert(me._objectToDb(data));
    }

    del_XXX_ById(trx, id) {
        const me = this;
        return me._checkTrx(trx)
            .where(me._objectToDb({id}))
            .del();
    }
}

module.exports = new Template();