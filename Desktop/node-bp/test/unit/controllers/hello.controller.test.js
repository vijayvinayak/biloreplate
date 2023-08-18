const generateRes = require('../../helpers/response-generator');

const HelloController = require('../../../src/controllers/hello.controller');
const dependency = require('../../../src/dependency');
const { helloService, loggerService } = dependency;

jest.mock('../../../src/services/hello.service');
jest.mock('../../../src/services/logger.service');
jest.mock('deferred', () => {
  return () => {
    return {
      resolve: jest.fn().bind(this),
      promise: jest.fn().bind(this),
    };
  };
});

describe('HelloController tests', () => {
  const helloController = new HelloController(helloService);

  test('should have class methods', () => {
    expect(helloController).toHaveProperty('getHello');
  });

  test('should get hello', async () => {
    const res = generateRes();
    const req = {};
    await helloController.getHello(req, res);
    expect(loggerService.info).toHaveBeenCalled();
    expect(helloService.getHello).toHaveBeenCalled();
  });
});
