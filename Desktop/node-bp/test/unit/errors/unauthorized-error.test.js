const UnauthorizedError = require('../../../src/errors/unauthorized-error');

describe('UnauthorizedError tests', () => {
  const errorMessage = 'Unauthorized error';
  const error = new UnauthorizedError(errorMessage, ['Unauthorized error']);

  it('should be instance of Error', async () => {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it('should have message and status property', async () => {
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('status');
    expect(error.message).toEqual(errorMessage);
    expect(error.status).toEqual(401);
  });
});
