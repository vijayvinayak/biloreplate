const ValidationHandler = require('../../../src/lib/validation-handler');
const ValidateError = require('../../../src/errors/validation-error');

describe('ValidationHandler class tests', () => {
  test('should successfully validate', async () => {
    const schema = {
      validate: jest.fn(() => {
        return {};
      }),
    };
    const result = ValidationHandler.validate(schema, {}, () => {
      return 'ok';
    });
    expect(result).toEqual('ok');
  });

  test('should handle error', async () => {
    const schema = {
      validate: jest.fn(() => {
        return { error: { details: [{ message: 'Something wrong' }] } };
      }),
    };
    const result = ValidationHandler.validate(schema, {}, (err) => {
      return err;
    });
    expect(result).toBeInstanceOf(ValidateError);
  });
});
