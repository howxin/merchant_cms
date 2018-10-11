module.exports = {
    ERRORS: {
        ERR_UNKNOWN_ERROR: 'ERR_UNKNOWN_ERROR',

        ERR_INIT_LOST_CONFIG: 'ERR_INIT_LOST_CONFIG',

        // db
        ERR_BEGIN_DB_TRANSACTION: 'ERR_BEGIN_DB_TRANSACTION',
        ERR_INVALID_DB_PARAMS: 'ERR_INVALID_DB_PARAMS',

    },
    APIERRORS: {
        ERR_UNKNOWN_ERROR: 'unknown_error',
        ERR_SYSTEM_BUSY: 'system_busy',
        ERR_INTERNAL_ERROR: 'unexpected_error',
        ERR_INVALID_PARAMS: 'invalid_params',
        ERR_OBJECT_MISMATCH: 'object_mismatch',
        ERR_OBJECT_INACTIVE: 'object_inactive',
        ERR_SESSION_EXPIRED: 'session_expired',
        ERR_PERMISSION_DENIED: 'permission_denied',
        ERR_INVALID_USERNAME_OR_PASSWORD: 'invalid_username_password',
        ERR_METHOD_NOT_FOUND: 'method_nofound',
        ERR_USER_NO_FOUND: 'user_nofound',
    }
};