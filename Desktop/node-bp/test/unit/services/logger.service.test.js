const LoggerService = require('../../../src/services/logger.service');

jest.mock('winston-daily-rotate-file', () => {
  return jest.fn();
});
jest.mock('../../../src/lib/service');

jest.mock('winston', () => ({
  createLogger: () => ({
    log: () => {},
  }),
  format: {
    printf: jest.fn(),
    timestamp: jest.fn(),
    combine: jest.fn(),
    json: jest.fn(),
    colorize: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
  },
}));

describe('LoggerService tests', () => {
  const OLD_ENV = process.env;
  let loggerService;

  beforeAll(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, LOG_TO_FILE: 'true', LOG_TO_FILE_LEVEL: 'true' };

    loggerService = new LoggerService();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('should log', async () => {
    loggerService.logger['log'] = jest.fn(() => {
      return 'level: error message';
    });
    const all = await loggerService.log('level', 'error message', {});
    expect(all).toStrictEqual('level: error message');
  });

  test('should log error', async () => {
    loggerService.logger['log'] = jest.fn(() => {
      return 'error: message';
    });
    await loggerService.error('error', 'message', {});
    expect(loggerService.logger['log']).toHaveBeenCalled();
  });

  test('should log warn', async () => {
    loggerService.logger['log'] = jest.fn(() => {
      return 'warn: error message';
    });
    await loggerService.warn('warn', 'message', {});
    expect(loggerService.logger['log']).toHaveBeenCalled();
  });

  test('should log info', async () => {
    loggerService.logger['log'] = jest.fn(() => {
      return 'info: message';
    });
    await loggerService.info('info', 'message', {});
    expect(loggerService.logger['log']).toHaveBeenCalled();
  });

  test('should log debug', async () => {
    loggerService.logger['log'] = jest.fn(() => {
      return 'debug: message';
    });
    await loggerService.debug('debug', 'message', {});
    expect(loggerService.logger['log']).toHaveBeenCalled();
  });
});
