const ValidationError = require('../../../src/errors/validation-error');

describe('ValidationError tests', () => {
  const errorMessage = 'Invalid input';
  const error = new ValidationError(errorMessage, ['Invalid parameter in body']);

  it('should be instance of Error', async () => {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should have message and status property', async () => {
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('status');
    expect(error).toHaveProperty('details');
    expect(error.message).toEqual(errorMessage);
    expect(error.status).toEqual(400);
  });
});
