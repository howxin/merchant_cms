"use strict";
const path = require('path');
const util = require('util');
const Knex = require('knex');
const config = require('../lib/config.js');
const { ERRORS } = require('../lib/constants.js');
const common = require('../utils/common.js');

const db = Knex(config['db']);

class ModelBase {
    constructor() {
        this.db = db;
        this.model = require('../lib/model.js');
        this.dbName = null;
        this.tableName = '';
        this.prefix = null;

        setImmediate(() => {
            if (this.prefix === null) {
                this.prefix = this.tableName + '_';
            }
        });

    }

    /**
     *
     * @param dbName
     * @private
     */
    _setDbName(dbName) {
        this.dbName = dbName;
    }

    /**
     *
     * @return {string}
     * @private
     */
    _getTableName() {
        return !!this.dbName ? `${this.dbName}.${this.tableName}` : this.tableName;
    }

    /**
     * 获取最后执行的sql语句
     * @private
     */
    _getLastQuery() {

    }

    /**
     *
     * @private
     */
    _getLastInsertId() {

    }

    _objectToDb(obj, tableName = false) {
        if (common.typeOf(obj) !== 'object') return obj;
        let result = {};
        for (let field in obj) {
            let key = (tableName ? `${tableName}.` : '') + `${this.prefix}_${field}`;
            result[key] = obj[field];
        }
        return result;
    }

    _dbToObject(obj, stringify) {
        if (common.typeOf(obj) !== 'object') return obj;
        let result = {};
        for (let field in obj) {
            result[(field.replace(`${this.prefix}_`, ''))] = obj[field];
        }
        return result;

    }

    _columnToDb(column) {
        if (common.typeOf(column) === 'string') {
            return `${this.prefix}_${column}`;
        } else if (common.typeOf(column) === 'array') {
            let data = [];
            for (let field in column) {
                data.push(`${this.prefix}_${column[field]}`);
            }
            return data;
        } else {
            return column;
        }

    }

    _dbToColumn(arr) {

    }

    _dbAsColumn(arr) {
        if (common.typeOf(arr) !== 'array') return arr;
        let columns = {};
        for (let field of arr) {
            columns[field] = `${this.prefix}${arr[field]}`;
        }
        return columns;
    }

    _checkTrx(trx) {
        return (!!trx)
            ? this.db(this.tableName).transacting(trx)
            : this.db(this.tableName);
    }

    async begin() {
        return util.promisify(this.db.transation)();
    }

    async commit(trx) {
        if (!trx) throw new Error();
        await trx.commit();
    }

    async rollback(trx) {
        if (!trx) throw new Error();
        await trx.rollback();
    }
}

module.exports = ModelBase;