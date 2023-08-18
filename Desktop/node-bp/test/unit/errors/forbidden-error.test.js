const ForbiddenError = require('../../../src/errors/forbidden-error');

describe('ForbiddenError tests', () => {
  const errorMessage = 'Forbidden';
  const error = new ForbiddenError(errorMessage, ['Forbidden']);

  test('should be instance of Error', async () => {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ForbiddenError);
  });

  it('should have message and status property', async () => {
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('status');
    expect(error.message).toEqual(errorMessage);
    expect(error.status).toEqual(403);
  });
});
