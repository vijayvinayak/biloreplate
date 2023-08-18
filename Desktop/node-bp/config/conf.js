const temp_config = require('./config.json');
let config_json;
const config_path = process.env.CONFIG_PATH + '/config.json';

try {
  config_json = require(config_path);
} catch {
  config_json = temp_config;
}

const port = process.env.PORT || config_json.port || 3000;
/** swagger target host  */
const swaggerTargetUrl = process.env.EXTERNAL_URL || config_json.external_url || 'localhost';
/** swagger target schema  */
const swaggerTargetSchema = process.env.EXTERNAL_SCHEMA || config_json.external_schema || 'https://';

module.exports = {
  port,
  docs: {
    swagger: {
      servers: [
        {
          url: `http://localhost:${port}/`,
          description: 'Development environment',
        },
        /**
         * The same host as for swagger
         */
        {
          url: '/',
          description: 'Test environment',
        },
        /**
         * Custom host
         */
        {
          url: `${swaggerTargetSchema}${swaggerTargetUrl}/`,
          description: 'Optional environmemt',
        },
      ],
    },
  },
  authOptions: {
    /** OpenID Connect Discovery parameters,
     * https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata, issuer.
     * Mandatory
     * */
    issuer: process.env.AUTH_ISSUER || config_json.auth_issuer,
    /** OpenID Connect Discovery parameters,
     * https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata, jwks_uri.
     * Mandatory
     * */
    publicKeyUri: process.env.AUTH_PUBLIC_KEY_URI || config_json.auth_public_key_uri,
    algorithms: ['RS256'],
    /** limit of time for waiting of auth server response */
    idleTimeout: process.env.AUTH_IDLE_TIMEOUT || config_json.auth_idle_timeout || 30,
    auth: process.env.AUTH || config_json.auth || false,
  },
  validationOptions: {
    abortEarly: false,
    allowUnknown: true,
  },
  /** limit of time for waiting of server response */
  serverTimeOutMilliseconds: process.env.SERVER_TIMEOUT_MS ? Number(process.env.SERVER_TIMEOUT_MS) : 180000,
  cors: {
    /** content of Access-Control-Allow-Origin header in response */
    accessControlAllowOrigin:
      process.env.HEADER_ACCESS_CONTROL_ALLOW_ORIGIN || config_json.HEADER_ACCESS_CONTROL_ALLOW_ORIGIN || '',
    /** content of Access-Control-Allow-Headers header in response */
    accessControlAllowHeaders:
      process.env.HEADER_ACCESS_CONTROL_ALLOW_HEADERS ||
      config_json.HEADER_ACCESS_CONTROL_ALLOW_HEADERS ||
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    /** content of Access-Control-Allow-Methods header in response */
    accessControlAllowMethods:
      process.env.HEADER_ACCESS_CONTROL_ALLOW_METHODS ||
      config_json.HEADER_ACCESS_CONTROL_ALLOW_METHODS ||
      'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  },
  /** if true error response has details property */
  errorDetails: process.env.ERROR_DETAILS || config_json.error_details || false,
  errorUnauthorized: 'Unauthorized',
  errorForbidden: 'Forbidden',
  errorNotFound: 'Not found',
  errorDefault400: 'Bad request',
  errorDefault: 'Internal Server Error',
  commonURLs: {
    /** VSC UI schema for internal consumers */
    schemaInternalUrl: process.env.SCHEMA_INTERNAL_URL || config_json.schema_internal_url || 'http://',
    /** VSC UI schema for external consumers */
    schemaExternalUrl: process.env.SCHEMA_EXTERNAL_URL || config_json.schema_internal_url || 'https://',
  },
  logs: {
    logFolder: `${process.env.LOG_PARENT_PATH || config_json.log_parent_path || '.'}/logs`,
    logFile: 'NodeTemplateApp-%DATE%.log',
    logToFile: process.env.LOG_TO_FILE || config_json.log_to_file || true,
    logToFileLevel: process.env.LOG_TO_FILE_LEVEL || config_json.log_to_file_level || 'error',
    debug: process.env.DEBUG || config_json.debug || false,
  },
};