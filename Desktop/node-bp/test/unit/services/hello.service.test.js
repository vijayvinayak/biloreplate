const HelloService = require('../../../src/services/hello.service');
const helloService = new HelloService();

test('returns Hello World', async () => {
  await helloService.init();
  const empty = await helloService.getHello();
  const name = await helloService.getHello('name');
  const name_name = await helloService.getHello('name_name');
  expect(empty).toBe('Hello World !!');
  expect(name).toBe('Hello NAME !');
  expect(name_name).toBe('Hello NAME NAME !');
});
