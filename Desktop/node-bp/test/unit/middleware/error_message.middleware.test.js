const config = require('../../../config/conf');

const errorMessagesMiddleware = require('../../../src/middleware/error_messages.middleware');

describe('corsMiddleware tests', () => {
  test('should be a function', () => {
    expect(errorMessagesMiddleware).toBeInstanceOf(Function);
  });

  test('should return error message on 401', () => {
    const result = errorMessagesMiddleware(401);
    expect(result).toEqual(config.errorUnauthorized);
  });

  test('should return error message on 403', () => {
    const result = errorMessagesMiddleware(403);
    expect(result).toEqual(config.errorForbidden);
  });

  test('should return error message on 404', () => {
    const result = errorMessagesMiddleware(404);
    expect(result).toEqual(config.errorNotFound);
  });

  test('should return error message on 400', () => {
    const result = errorMessagesMiddleware(400);
    expect(result).toEqual(config.errorDefault400);
  });

  test('should return error message on 305', () => {
    const result = errorMessagesMiddleware(305);
    expect(result).toEqual(config.errorDefault);
  });
});
