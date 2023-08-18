class ForbiddenError extends Error {
  constructor(customMessage, message) {
    super(message);
    this.customMessage = customMessage;
    this.status = 403;
  }
}

module.exports = ForbiddenError;
