module.exports = {
    ERRORS: {
        ERR_UNKNOWN_ERROR    : 'unexpected_error',
        ERR_INTERNAL_ERROR   : 'unexpected_error',
        ERR_SYSTEM_BUSY      : 'system_busy',
        ERR_INVALID_REQUEST  : 'invalid_request',
        ERR_INVALID_PARAMS   : 'invalid_params',
        ERR_OBJECT_MISMATCH  : 'object_mismatch',
        ERR_OBJECT_INACTIVE  : 'object_inactive',
        ERR_SESSION_EXPIRED  : 'session_expired',
        ERR_PERMISSION_DENIED: 'permission_denied',
        ERR_ACCESS_DENIED    : 'access_denied',

        ERR_INIT_LOST_CONFIG: 'init_lost_config'
    },
    DBERROR: {
        ERR_BEGIN_DB_TRANSACTION: 'begin_db_transaction',
        ERR_INVALID_DB_PARAMS: 'invalid_db_params',
    },
    APIERRORS: {
        ERR_INVALID_PARAMS   : 'invalid_params',
        ERR_SESSION_EXPIRED: 'session_expired',
        ERR_INVALID_USERNAME_OR_PASSWORD: 'invalid_username_password',
        ERR_METHOD_NOT_FOUND: 'method_nofound',
        ERR_USER_NO_FOUND: 'user_nofound',
        ERR_PRODUCT_TYPE_NOT_FOUND: 'product_type_not_found',
        ERR_PRODUCT_TYPE_EXISTS: 'product_type_exists',
        ERR_PRODUCT_TYPE_USED: 'product_type_used',
    }
};