const { mockResponse } = require('../../helpers/mock');
const { errorHandler } = require('../../../src/middleware');

describe('errorHandler', () => {
  test('should return 500 error response when server error occured', () => {
    const err = {
      message: 'Error',
    };
    const req = {};
    const res = mockResponse();
    const next = {};

    const errorResponse = errorHandler(err, req, res, next);

    expect(res.responseStatus).toBe(500);
    expect(errorResponse).toEqual({
      errors: [
        {
          message: err.message,
          errorType: 'serverError',
        },
      ],
    });
  });

  test('should call next when headersSent property is true', () => {
    const err = {};
    const req = {};
    const res = {
      headersSent: true,
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
