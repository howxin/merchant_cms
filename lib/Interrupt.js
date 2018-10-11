"use strict";
const Exception = require('./Exception.js');
const {APIERRORS} = require('./constants.js');

exports.InternalError = class InternalError extends Exception {
    constructor(...args) {
        super(APIERRORS.ERR_INTERNAL_ERROR, ...args);
    }
};

exports.InvalidParams = class InvalidParams extends Exception {
    constructor(...args) {
        super(APIERRORS.ERR_INVALID_PARAMS, ...args);
    }
};

exports.ObjectMismatch = class ObjectMismatch extends Exception {
    constructor(errMsg, extra, stack) {
        super(errMsg, extra, stack);
        this.errCode = APIERRORS.ERR_OBJECT_MISMATCH;
    }
};

exports.ObjectInactive = class ObjectInactive extends Exception {
    constructor(errMsg, extra, stack) {
        super(errMsg, extra, stack);
        this.errCode = APIERRORS.ERR_OBJECT_INACTIVE;
    }
};

exports.SessionExpired = class SessionExpired extends Exception {
    constructor(errMsg, extra, stack) {
        super(errMsg, extra, stack);
        this.errCode = APIERRORS.ERR_SESSION_EXPIRED;
    }
};