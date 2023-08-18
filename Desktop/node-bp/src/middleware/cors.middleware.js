const config = require('../../config/conf');

module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.cors.accessControlAllowOrigin);
  res.setHeader('Access-Control-Allow-Headers', config.cors.accessControlAllowHeaders);
  res.setHeader('Access-Control-Allow-Methods', config.cors.accessControlAllowMethods);
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};
