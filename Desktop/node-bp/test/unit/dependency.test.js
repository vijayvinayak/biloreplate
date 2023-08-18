const dependency = require('../../src/dependency');

jest.mock('../../src/services');

jest.mock('../../src/helpers/initServices');

describe('Dependency tests', () => {
  test('should initAll', async () => {
    await dependency.initAll();
    expect(dependency).toHaveProperty('loggerService');
    expect(dependency).toHaveProperty('helloService');
  });
});
