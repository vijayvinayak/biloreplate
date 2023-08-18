const deferred = require('deferred');

class Service {
  constructor() {
    this.ready = false;
    this.defer = deferred();
    this.onReady = this.defer.promise;
    this.serviceName = this.constructor.name;
  }

  // eslint-disable-next-line class-methods-use-this
  async bootstrap() {
    // Placeholder
  }

  async init() {
    try {
      await this.bootstrap();
      this.ready = true;
      this.defer.resolve();
    } catch (err) {
      this.defer.resolve(err);
      throw err;
    }
  }
}

module.exports = Service;
