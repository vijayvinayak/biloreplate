const express = require('express');
const helloRouter = require('./hello.route');
const healthRouter = require('./health.route');
const swaggerRouter = require('./docs.route');

module.exports = () => {
  const router = express.Router();

  router.use('/', healthRouter);
  router.use('/', helloRouter);
  router.use('/docs', swaggerRouter);

  return router;
};
