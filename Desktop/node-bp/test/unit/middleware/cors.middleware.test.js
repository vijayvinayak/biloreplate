const corsMiddleware = require('../../../src/middleware/cors.middleware');
const generateRes = require('../../helpers/response-generator');

describe('corsMiddleware tests', () => {
  test('should be a function', () => {
    expect(corsMiddleware).toBeInstanceOf(Function);
  });

  test('should set CORS headers on response', () => {
    const res = generateRes();
    corsMiddleware({ headers: { origin: 'origin' } }, res, () => {
      expect(res).toHaveProperty('headers');
      expect(res.headers).toHaveProperty('Access-Control-Allow-Origin');
      expect(res.headers).toHaveProperty('Access-Control-Allow-Headers');
      expect(res.headers).toHaveProperty('Access-Control-Allow-Methods');
    });
  });

  test('should send 200 status code', () => {
    const res = generateRes();
    corsMiddleware({ method: 'OPTIONS', headers: { origin: 'origin' } }, res, () => {});
    expect(res.body).toEqual(200);
  });
});
