const Service = require('../../../src/lib/service');
jest.mock('deferred', () => {
  return () => {
    return {
      resolve: jest.fn().bind(this),
      promise: jest.fn().bind(this),
    };
  };
});

test('returns error', async () => {
  const service = new Service();
  service.bootstrap = jest
    .fn(() => {
      throw new Error();
    })
    .bind(this);
  const f = async () => {
    try {
      await service.init();
    } catch (e) {
      return e;
    }
  };
  expect(await f()).toBeInstanceOf(Error);
});
