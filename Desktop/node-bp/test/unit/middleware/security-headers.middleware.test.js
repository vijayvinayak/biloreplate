const securityHeadersMiddleware = require('../../../src/middleware/security-headers.middleware');
const generateRes = require('../../helpers/response-generator');

describe('Security-headers Middleware tests', () => {
  test('should be a function', () => {
    expect(securityHeadersMiddleware).toBeInstanceOf(Function);
  });

  test('should set security headers on response', () => {
    const res = generateRes();
    securityHeadersMiddleware({}, res, () => {
      expect(res).toHaveProperty('headers');
      expect(res.headers).toHaveProperty('X-Content-Type-Options');
      expect(res.headers).toHaveProperty('X-XSS-Protection');
      expect(res.headers).toHaveProperty('Strict-Transport-Security');
    });
  });
});
