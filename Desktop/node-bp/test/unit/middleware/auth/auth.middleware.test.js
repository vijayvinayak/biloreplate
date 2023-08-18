const UnauthorizedError = require('../../../../src/errors/unauthorized-error');
const auth = require('../../../../src/middleware/auth/auth.middleware');
const generateRes = require('../../../helpers/response-generator');
const axios = require('axios');
const jwt = require('jsonwebtoken');
jest.mock('deferred', () => {
  return () => {
    return {
      resolve: jest.fn().bind(this),
      promise: jest.fn().bind(this),
    };
  };
});

jest.mock('../../../../src/dependency');
jest.mock('../../../../src/services/logger.service');
jest.mock('rsa-pem-from-mod-exp', () => {
  return () => 'a';
});
jest.mock('jsonwebtoken');
jest.mock('axios');

describe('auth tests', () => {
  it('should be function', () => {
    expect(auth.authorize).toBeInstanceOf(Function);
    expect(auth.skipExcludedUrls).toBeInstanceOf(Function);
  });

  it('should throw if no header', async () => {
    const res = generateRes();
    const req = { headers: {} };
    const x = await auth.authorize(req, res, (e) => e);
    expect(x).toBeInstanceOf(UnauthorizedError);
  });

  it('should throw if no segments', async () => {
    const res = generateRes();
    const req = { headers: { authorization: 'a' } };
    const x = await auth.authorize(req, res, (e) => e);
    expect(x).toBeInstanceOf(UnauthorizedError);
  });

  it('should throw if no keys', async () => {
    const res = generateRes();
    const req = { headers: { authorization: 'Bearer a' } };
    axios.get = jest.fn().mockResolvedValue({
      data: { keys: [], primary: 'a', secondary: 'b' },
    });
    jwt.verify = jest.fn((a, b, c, callback) => {
      return callback(null, 1);
    });
    jwt.decode = jest.fn().mockResolvedValue({
      payload: {
        Email: 'a',
        first: 'a',
        last: 'a',
        name: 'a a',
      },
    });
    const x = await auth.authorize(req, res, (e) => e);
    expect(x).toBeInstanceOf(UnauthorizedError);
  });

  it('should throw if token expired', async () => {
    const res = generateRes();
    const req = { headers: { authorization: 'Bearer a' } };
    axios.get = jest.fn().mockResolvedValue({
      data: { keys: null, primary: 'a', secondary: 'b' },
    });
    const x = await auth.authorize(req, res, () => 1);
    expect(x).toBe(1);
  });

  it('should skip excluded urls', () => {
    const skipped = auth.skipExcludedUrls((a, b, c) => a + b + c, ['a']);
    expect(skipped).toBeInstanceOf(Function);
    expect(skipped(1, 2, 3)).toBe(6);
  });

  it('should skip urls', () => {
    const skipped = auth.skipExcludedUrls((req, b, c) => c(), ['a']);
    expect(skipped({ originalUrl: 'a', s: 1 }, 2, () => 6)).toBe(6);
  });
});
