const Service = require('../lib/service');

class HelloService extends Service {
  constructor() {
    super();
  }

  async bootstrap() {
    this.hello = 'Hello World !!';
  }

  getHello(name) {
    if (name) {
      name = name.toUpperCase().replace(/_/g, ' ');
    }
    return name ? `Hello ${name} !` : this.hello;
  }
}

module.exports = HelloService;
