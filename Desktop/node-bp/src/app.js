const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const config = require('../config/conf');
const mainRoute = require('./routes');
const swaggerRouter = require('./routes/docs.route');
const dependency = require('./dependency');
const { initAll, loggerService } = dependency;

const { NotFoundError } = require('./errors');
const errorMessage = require('./middleware/error_messages.middleware');

const cors = require('./middleware/cors.middleware');
const securityHeaders = require('./middleware/security-headers.middleware');
const auth = require('../src/middleware/auth/auth.middleware');

const app = express();

async function createServer() {
  app.use(express.json({ limit: '10mb', extended: true }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  app.use(cors);
  app.use(securityHeaders);
  app.disable('x-powered-by');
  app.use('/docs', swaggerRouter);

  /****** Excluded url must be here. Don't change this hardcode! */
  const excludedUrls = ['/health', '/version'];
  if (config.authOptions.auth) {
    app.use(auth.skipExcludedUrls(auth.authorize, excludedUrls));
  }
  /****** */

  app.use('/', mainRoute());

  app.use((req, res, next) => {
    const message = 'API path not found';
    loggerService.error(message);
    return next(new NotFoundError(message));
  });

  app.use((error, req, res, next) => {
    if (error) {
      const status = error.status || 500;
      const message = error.customMessage || errorMessage(status);
      const response = {
        status,
        message,
      };
      if (config.errorDetails) {
        response.details = error.details;
        response.systemMessage = error.message;
      }

      loggerService.error('Unexpected error', error);
      return res.status(status).json(response);
    }

    return next(error);
  });

  const server = app.listen(config.port, () => {
    loggerService.info(`Example app listening on port ${config.port}`);
  });

  server.timeout = config.serverTimeOutMilliseconds;
}

function start() {
  return initAll().then(createServer);
}

start();

module.exports = app;
