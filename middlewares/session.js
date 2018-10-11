"use strict";
const common = require('../utils/common.js');

class Session {
    constructor(opts) {
        this.app = opts.app;
        this.sessionMap = new Map();
    }

    createSessionItem(sessionId) {
        const me = this;
        return {
            sessionId,
            cache: new Map(),
            get: function (key) {
                return this.cache.get(key);
            },
            set: function (key, value) {
                this.cache.set(key, value);
            },
            destroy: function () {
                me.sessionMap.delete(this.sessionId);
            },
            update: function (ctx, {sessionId}) {
                const obj = me.sessionMap.get(this.sessionId);
                me.sessionMap.delete(this.sessionId);
                obj.sessionId = sessionId;
                me.sessionMap.set(sessionId, obj);
                ctx.cookies.set('SESSION_ID', sessionId, {overwrite: true});
            }
        }
    }

    async handle(ctx, next) {
        const me = this;
        let sessionId = ctx.cookies.get('SESSION_ID');
        if (!sessionId) {
            sessionId = common.genCode(40);
            ctx.cookies.set('SESSION_ID', sessionId);
            me.sessionMap.set(sessionId, me.createSessionItem(sessionId));
        }
        if (!me.sessionMap.has(sessionId)) {
            me.sessionMap.set(sessionId, me.createSessionItem(sessionId));
        }
        ctx.session = me.sessionMap.get(sessionId);
        await next();
    }
}

module.exports = function (app, conf) {
    const opts = Object.assign({}, conf, {app});
    const session = new Session(opts);
    return session.handle.bind(session);
};
