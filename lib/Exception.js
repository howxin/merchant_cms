"use strict";
const {ERRORS} = require('./constants');

class Exception {
    constructor(errCode, errMsg, extra, stack) {
        this.status = 'error';
        this.error = errCode || ERRORS.ERR_UNKNOWN_ERROR;
        this.message = errMsg || 'unknown error';
        this.extra =  extra || '';
        this.stack = stack;
    }

    output() {
        return {
            status: this.status,
            errcode: this.error,
            errmsg: this.message,
            extra: this.extra
        };
    }
}

module.exports = Exception;