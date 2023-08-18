class DefaultError extends Error {
  constructor(customMessage, message) {
    super(message);
    this.customMessage = customMessage;
    this.status = 500;
  }
}

module.exports = DefaultError;
