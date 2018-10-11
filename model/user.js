"use strict";
const ModelBase = require('../lib/ModelBase.js');

class User extends ModelBase {
    constructor() {
        super();
        this.tableName = 'user';
        this.prefix = 'user'
    }

    getUserInfoById(trx, fields = '*', id) {
        const me = this;
        return me._checkTrx(trx)
            .first(me._columnToDb(fields))
            .where(me._objectToDb({
                id
            }));
    }

    getUserInfoByUsernameAndPsw(trx, fields = '*', {username, password}) {
        const me = this;
        return me._checkTrx(trx)
            .first(me._columnToDb(fields))
            .where(me._objectToDb({
                username,
                password
            }))
            .then(data => me._dbToObject(data));
    }

    getUserInfoBySessionId(trx, fields = '*', session_id) {
        const me = this;
        return me._checkTrx(trx)
            .first(me._columnToDb(fields))
            .where(me._objectToDb({
                session_id
            }));
    }

    updatePasswordById(trx, id, psw) {
        const me = this;
        return me._checkTrx(trx)
            .update(me._objectToDb({password: psw, updated: Date.now()}))
            .where(me._objectToDb({id}));
    }

    updateUserInfoById(trx, id, data) {
        const me = this;
        Object.assign(data, {updated: Date.now()});
        return me._checkTrx(trx)
            .update(me._objectToDb(data))
            .where(me._objectToDb({id}));
    }

    userLogin(trx, id, session_id, session_expired) {
        const me = this;
        const dbNow = Date.now();
        const data = {
            session_id,
            session_expired,
            login_time: dbNow,
            updated: dbNow
        };
        return me._checkTrx(trx)
            .update(me._objectToDb(data))
            .where(me._objectToDb({id}));
    }

    openUserTwoStepVerify(trx, id, secret) {
        const me = this;
        return me._checkTrx(trx)
            .update(me._objectToDb({
                secret: secret,
                secret_bind: 1,
            }))
            .where(me._objectToDb({id}));
    }

    closeUserTwoStepVerify(dbc, id) {
        const me = this;
        return me._checkTrx(trx)
            .update(me._objectToDb({
                secret: '',
                secret_bind: 0,
            }))
            .where(me._objectToDb({id}));
    }

    addOneUser(trx, data, returning = ['id']) {
        const me = this;
        Object.assign(data, {created: Date.now()});
        return me._checkTrx(trx)
            .returning(me._columnToDb(returning))
            .insert(me._objectToDb(data));
    }

}

module.exports = new User();