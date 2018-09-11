const { mongooseService } = require('../../src/services');

beforeAll(() => {
  mongooseService.connect();
});

afterAll(() => {
  mongooseService.disconnect();
});
