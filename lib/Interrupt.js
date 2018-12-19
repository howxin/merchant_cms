"use strict";
const Exception = require('./Exception.js');
const { ERRORS } = require('./constants.js');

exports.InternalError = class InternalError extends Exception {
    constructor(...args) {
        super(ERRORS.ERR_INTERNAL_ERROR, ...args);
    }
};

exports.InvalidRequest = class InvalidParams extends Exception {
    constructor(...args) {
        super(ERRORS.ERR_INVALID_REQUEST, ...args);
    }
};

exports.InvalidParams = class InvalidParams extends Exception {
    constructor(...args) {
        super(ERRORS.ERR_INVALID_PARAMS, ...args);
    }
};

exports.ObjectMismatch = class ObjectMismatch extends Exception {
    constructor(errMsg, extra, stack) {
        super(ERRORS.ERR_OBJECT_MISMATCH, errMsg, extra, stack);
    }
};

exports.ObjectInactive = class ObjectInactive extends Exception {
    constructor(errMsg, extra, stack) {
        super(ERRORS.ERR_OBJECT_INACTIVE, errMsg, extra, stack);
    }
};

exports.SessionExpired = class SessionExpired extends Exception {
    constructor(errMsg, extra, stack) {
        super(ERRORS.ERR_SESSION_EXPIRED, errMsg, extra, stack);
    }
};

exports.AccessDenied = class AccessDenied extends Exception {
    constructor(errMsg, extra, stack) {
        super(ERRORS.ERR_ACCESS_DENIED, errMsg, extra, stack);
    }
};