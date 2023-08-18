const { initServices } = require('./helpers');
const { HelloService, LoggerService } = require('./services');
const services = {};

services.loggerService = new LoggerService();
services.helloService = new HelloService();

module.exports = {
  ...services,
  async initAll() {
    return initServices(Object.values(services));
  },
};
