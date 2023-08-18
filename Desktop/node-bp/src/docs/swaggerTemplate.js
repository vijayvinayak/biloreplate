const { version } = require('../../package.json');
const config = require('../../config/conf');

const swaggerTemplate = {
  openapi: '3.0.0',
  info: {
    title: 'Solution Factory: Node.JS Boiler Plate API documentation',
    version,
  },
  servers: config.docs.swagger.servers,
};

module.exports = swaggerTemplate;
