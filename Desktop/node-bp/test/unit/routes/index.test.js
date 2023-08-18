const router = require('../../../src/routes');

jest.mock('swagger-jsdoc');
jest.mock('deferred', () => {
  return () => {
    return {
      resolve: jest.fn().bind(this),
      promise: jest.fn().bind(this),
    };
  };
});

describe('test all router', () => {
  it('should init all router', async () => {
    router();
  });
});
