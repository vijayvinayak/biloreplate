const { version } = require('../../package.json');

class HealthController {
  async health(req, res) {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    try {
      res.status(200).json(healthcheck);
    } catch (e) {
      healthcheck.message = e;
      res.status(503).json(healthcheck);
    }
  }

  async version(req, res) {
    res.status(200).json({ version });
  }
}
module.exports = HealthController;
