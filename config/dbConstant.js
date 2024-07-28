module.exports = {
  HTTP_CODE: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    SERVICE_UNAVAILABLE: 503,
    INTERNAL_SERVER_ERROR: 500,
  },

  RESULT_CODE: {
    SUCCESS: 1001,
    HOLD: 1002,

    FAILED: 9999, //
    TECHNICAL_ERROR: 2001, //
    ERROR_WITH_SERVICE_PROVIDER: 2002,
    SERVICE_NOT_AVAILABLE: 2003,
    AUTHENTICATION_FAILED: 2004,
    SERVER_DOWN: 2005, //
    CANNOT_PROCESS_THE_REQUEST: 2006,
    ENCRYPTION_FAILED: 2007, //
    DECRYPTION_FAILED: 2008,
    HASH_VALIDATION_FAILED: 2009,

    ACTIVE_ACCOUNT_NOT_FOUND: 2011, //
    USER_ACCOUNT_NOT_FOUND: 2012, //
    DOB_MISMATCH: 2013, //
    MOBILE_NUMBER_NOT_FOUND: 2014, //

    INVALID_ACCOUNT: 2021, //
  },

  RESULT_STATUS: {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    HOLD: 'HOLD',
    REFUND: 'REFUND',
    CANCEL: 'CANCEL',
    PROCESSING: 'PROCESSING',
    PENDING: 'PENDING',
    UNDEFINED: 'UNDEFINED',
    ERROR: 'ERROR',
  },

  RESULT_MESSAGES: {
    E1001: 'The request is successfully processed',
    E1002: 'The status updated as hold',

    E9999: 'Processed request failed',
    E2001: 'Failed due to technical error',
    E2002: 'Error with Service Provider',
    E2003: 'Service not available',
    E2004: 'Authentication Failed',
    E2005: 'Server Down',
    E2006: 'Cannot process this request',
    E2007: 'Encryption failed',
    E2008: 'Decryption failed',
    E2009: 'Hash validation failed',

    E2011: 'No active account found',
    E2012: 'Account not found for user',
    E2013: 'DOB mismatch',
    E2014: 'Mobile number not found',

    E2021: 'Invalid account',

    SUCCESS: 'Request processed successfully',
    FAILED: 'The request is failed',
    SESSION_EXPIRED: 'Session expired, please try again',
    TECHNICAL_ERROR: 'We are experiencing technical difficulties, please try again later',
  },
};
