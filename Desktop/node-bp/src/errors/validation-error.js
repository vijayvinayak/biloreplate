class ValidationError extends Error {
  constructor(customMessage, details = undefined) {
    super(customMessage);
    this.customMessage = customMessage;
    this.status = 400;
    this.details = details;
  }
}

module.exports = ValidationError;
