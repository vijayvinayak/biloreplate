const Service = require('../../../src/lib/service');
const initServices = require('../../../src/helpers/initServices');

jest.mock('../../../src/lib/service');

describe('initServices helper function', () => {
  it('should be function', () => {
    expect(initServices).toBeInstanceOf(Function);
  });

  it('should be initialized', async () => {
    const testService = new Service();
    const services = [testService];
    await initServices(services);
    expect(testService.init).toHaveBeenCalled();
    expect(services[0]).toBeInstanceOf(Service);
  });
  it('not should be initialized by object', async () => {
    const testService = {
      init: () => {},
    };
    const res = await initServices([testService]).catch((e) => {
      return e;
    });
    expect(res).toBeInstanceOf(Array);
    expect(res[0]).toHaveProperty('init');
  });
  it('not should be initialized by string', async () => {
    const testService = 'object';
    const res = await initServices([testService]).catch((e) => e);
    expect(res).toBeInstanceOf(Error);
  });
});
