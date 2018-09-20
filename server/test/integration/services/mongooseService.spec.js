const mongoose = require('mongoose');
const { mongooseService } = require('../../../src/services');

const MONGOOSE = {
  CONNECTION: {
    DISCONNECTED: 0,
    CONNECTED: 1,
  },
};

describe('mongooseService test', () => {
  test('should connect mongodb', async () => {
    await mongooseService.connect();

    expect(mongoose.connection.readyState).toBe(MONGOOSE.CONNECTION.CONNECTED);
  });

  test('should disconnect mongodb', async () => {
    await mongooseService.disconnect();

    expect(mongoose.connection.readyState).toBe(
      MONGOOSE.CONNECTION.DISCONNECTED,
    );
  });
});
