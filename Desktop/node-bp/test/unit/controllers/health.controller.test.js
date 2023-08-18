const generateRes = require('../../helpers/response-generator');
const HealthController = require('../../../src/controllers/health.controller');

describe('HealthController tests', () => {
  const healthController = new HealthController();

  test('should have class methods', () => {
    expect(healthController).toHaveProperty('health');
    expect(healthController).toHaveProperty('version');
  });

  test('should check health', async () => {
    const res = generateRes();
    const req = {};
    await healthController.health(req, res);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('should return error', async () => {
    const res = generateRes();
    const req = {};
    res['json'] = jest
      .fn((data) => {
        res.body = data;
        return res;
      })
      .mockImplementationOnce(() => {
        throw new Error();
      });
    await healthController.health(req, res);
    expect(res.statusCode).toEqual(503);
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('should get version', async () => {
    const res = generateRes();
    const req = {};
    await healthController.version(req, res);
    expect(res.body).toHaveProperty('version');
  });
});
