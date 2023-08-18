const NotFoundError = require('../../../src/errors/not-found-error');

describe('NotFoundError tests', () => {
  const errorMessage = 'Not found error';
  const error = new NotFoundError(errorMessage);

  it('should be instance of Error', async () => {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(NotFoundError);
  });

  it('should have message and status property', async () => {
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('status');
    expect(error.customMessage).toEqual(errorMessage);
    expect(error.status).toEqual(404);
  });
});
