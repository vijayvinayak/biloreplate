const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const Service = require('../lib/service');
const config = require('../../config/conf');

const logFormat = format.printf(
  (info) => `${new Date().toISOString()}-${info.level}: ${JSON.stringify(info.message, null, 2)}`
);

class LoggerService extends Service {
  constructor() {
    super();

    let transport = [];

    if (config.logs.logToFile) {
      transport = [
        new DailyRotateFile({
          filename: `${config.logs.logFolder}/${config.logs.logFile}`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ];
    }

    this.logger = createLogger({
      level: config.logs.logToFileLevel || 'error',
      transports: [
        new transports.Console({
          prettyPrint: true,
          colorize: true,
          level: ['*', 'true', 'debug'].includes(config.logs.debug) ? 'debug' : 'info',
          format: format.combine(format.colorize(), logFormat),
        }),
        ...transport,
      ],
    });
  }

  log(level, message, meta) {
    return this.logger.log(level, message, meta);
  }

  error(message, meta) {
    this.log('error', message, meta);
  }

  warn(message, meta) {
    this.log('warn', message, meta);
  }

  info(message, meta) {
    this.log('info', message, meta);
  }

  debug(message, meta) {
    this.log('debug', message, meta);
  }
}

module.exports = LoggerService;