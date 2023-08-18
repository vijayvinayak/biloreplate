const { loggerService } = require('../dependency');

class HelloController {
  constructor(helloService) {
    this.helloService = helloService;
  }

  async getHello(req, res) {
    loggerService.info('getHello method was invoked');
    const hello = await this.helloService.getHello();
    return res.status(200).json({ message: hello });
  }
}

module.exports = HelloController;
