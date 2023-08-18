class UnauthorizedError extends Error {
  constructor(customMessage, message) {
    super(message);
    this.customMessage = customMessage;
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
