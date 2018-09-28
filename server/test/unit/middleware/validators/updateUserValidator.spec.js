const { validationErrorsResult } = require('../../../helpers/utils');
const {
  updateUserValidator,
} = require('../../../../src/middleware/validators');
const { GENDER, LANGUAGE, EXCHANGE_SITES } = require('../../../../src/models');

describe('updateUserValidator test', () => {
  test('should call next if the user is verified', async () => {
    const req = {
      body: {
        displayName: 'Super Man',
        email: 'test@example.com',
        gender: GENDER.MALE,
        language: LANGUAGE.JAPANESE,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.BITFLYER,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(true);
  });

  test('should call next if the user does NOT exist', async () => {
    const req = {
      body: {},
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(true);
  });

  test('should have an error about wrong displayName if the displayName is empty', async () => {
    const req = {
      body: {
        displayName: '',
        email: 'test@example.com',
        gender: GENDER.FEMALE,
        language: LANGUAGE.ENGLISH,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.ZAIF,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'displayName',
      value: '',
      msg: 'The length of a displayName must be between 1 and 50.',
    });
  });

  test('should not have any errors if the length of the displayName is MIN value', async () => {
    const req = {
      body: {
        displayName: 'A',
        email: 'test@example.com',
        gender: GENDER.FEMALE,
        language: LANGUAGE.ENGLISH,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.ZAIF,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(true);
  });

  test('should not have any errors if the length of the displayName is MAX value', async () => {
    const req = {
      body: {
        displayName: '01234567890123456789012345678901234567890123456789',
        email: 'test@example.com',
        gender: GENDER.FEMALE,
        language: LANGUAGE.ENGLISH,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.ZAIF,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(true);
  });

  test('should have an error about wrong displayName if the length of the displayName is over MAX value', async () => {
    const req = {
      body: {
        displayName: '01234567890123456789012345678901234567890123456789A',
        email: 'test@example.com',
        gender: GENDER.MALE,
        language: LANGUAGE.JAPANESE,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.BITFLYER,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'displayName',
      value: '01234567890123456789012345678901234567890123456789A',
      msg: 'The length of a displayName must be between 1 and 50.',
    });
  });

  test('should not have any errors if the email is empty', async () => {
    const req = {
      body: {
        displayName: 'Super Man',
        email: '',
        gender: GENDER.MALE,
        language: LANGUAGE.JAPANESE,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.BITFLYER,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(true);
  });

  test('should have an error about wrong email if the format of the email is wrong', async () => {
    const req = {
      body: {
        displayName: 'Super Man',
        email: 'test#example.com',
        gender: GENDER.MALE,
        language: LANGUAGE.JAPANESE,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.BITFLYER,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'email',
      value: 'test#example.com',
      msg: 'The format of an email was wrong.',
    });
  });

  test('should have an error about wrong gender if the format of the gender is wrong', async () => {
    const req = {
      body: {
        displayName: 'Super Man',
        email: 'test@example.com',
        gender: 'amphibian',
        language: LANGUAGE.JAPANESE,
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.BITFLYER,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'gender',
      value: 'amphibian',
      msg: 'The format of a gender was wrong.',
    });
  });

  test('should have an error about wrong language if the format of the language is wrong', async () => {
    const req = {
      body: {
        displayName: 'Super Man',
        email: 'test@example.com',
        gender: GENDER.JAPANESE,
        language: 'none',
        secrets: [
          {
            apiProvider: EXCHANGE_SITES.BITFLYER,
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'language',
      value: 'none',
      msg: 'The format of a language was wrong.',
    });
  });

  test('should have an error about wrong apiProvider in secrets if the format of the apiProvider is wrong', async () => {
    const req = {
      body: {
        displayName: 'Super Man',
        email: 'test@example.com',
        gender: GENDER.JAPANESE,
        language: LANGUAGE.JAPANESE,
        secrets: [
          {
            apiProvider: 'none',
            apiKey: 'ANY_API_KEY',
            apiSecret: 'ANY_API_SECRET',
          },
        ],
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateUserValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The format of secrets was wrong.',
      param: 'secrets',
      value: [
        {
          apiProvider: 'none',
          apiKey: 'ANY_API_KEY',
          apiSecret: 'ANY_API_SECRET',
        },
      ],
    });
  });
});
