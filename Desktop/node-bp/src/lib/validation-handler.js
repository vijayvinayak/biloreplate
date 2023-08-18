const { ValidationError } = require('../errors');
const config = require('../../config/conf');
const { validationOptions } = config;

class ValidationHandler {
  static validate(schema, req, next) {
    const { error } = schema.validate(req, validationOptions);

    if (error) {
      return ValidationHandler.handleErrorDetails(error, next);
    }

    return next();
  }

  static handleErrorDetails(error, next) {
    const details = error.details.reduce((acc, detail) => `${acc} ${detail.message}`, '');

    return next(new ValidationError('Invalid request', details));
  }
}

module.exports = ValidationHandler;
