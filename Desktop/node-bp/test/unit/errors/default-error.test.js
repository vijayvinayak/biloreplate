const DefaultError = require('../../../src/errors/default-error');

describe('DefaultError tests', () => {
  const errorMessage = 'Error';
  const error = new DefaultError(errorMessage, ['Error']);

  test('should be instance of Error', async () => {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(DefaultError);
  });

  it('should have message and status property', async () => {
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('status');
    expect(error.message).toEqual(errorMessage);
    expect(error.status).toEqual(500);
  });
});
