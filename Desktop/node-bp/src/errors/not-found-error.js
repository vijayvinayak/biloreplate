class NotFoundError extends Error {
  constructor(customMessage, message) {
    super(message);
    this.customMessage = customMessage;
    this.status = 404;
  }
}

module.exports = NotFoundError;
