const ForbiddenError = require('./forbidden-error');
const NotFoundError = require('./not-found-error');
const ValidationError = require('./validation-error');
const DefaultError = require('./default-error');
const UnauthorizedError = require('./unauthorized-error');

module.exports = {
  ForbiddenError,
  NotFoundError,
  ValidationError,
  DefaultError,
  UnauthorizedError,
};
