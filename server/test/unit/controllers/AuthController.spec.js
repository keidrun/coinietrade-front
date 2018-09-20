/* eslint-disable node/no-unpublished-require */
const faker = require('faker');
const uuid = require('uuid');
const { mockResponse } = require('../../helpers/mocks');
const { AuthController } = require('../../../src/controllers');

const users = [
  {
    _id: uuid.v4(),
    authProvider: {
      name: 'facebook',
      id: '7341425083475238',
      accessToken:
        'JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIB',
      refreshToken:
        'UNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678',
    },
    displayName: faker.internet.userName(),
    familyName: faker.name.lastName(),
    givenName: faker.name.firstName(),
    middleName: faker.name.lastName(),
    email: faker.internet.email(),
    avatarUrl: faker.internet.url(),
    gender: 'female',
    language: 'en',
    secrets: [],
  },
];

describe('AuthController', () => {
  test('should find a logged-in user', async () => {
    const req = {
      user: users[0],
    };
    const res = mockResponse();

    const response = AuthController.findLoggedInUser(req, res);

    expect(response).toEqual({
      id: users[0]._id,
      displayName: users[0].displayName,
      avatarUrl: users[0].avatarUrl,
    });
  });

  test('should return 404 error response when the user not found', () => {
    const req = {};
    const res = mockResponse();

    const errorResponse = AuthController.findLoggedInUser(req, res);

    expect(res.responseStatus).toBe(404);
    expect(errorResponse).toEqual({
      errors: [
        {
          message: 'Not the user data found.',
          errorType: 'clientError',
        },
      ],
    });
  });

  test('should call deleteToken method and redirect when the user logged-out', async () => {
    const req = {
      user: {
        deleteToken: jest.fn(),
      },
      logout: jest.fn(),
    };
    const res = {
      clearCookie: jest.fn(),
      redirect: jest.fn(),
    };

    await AuthController.logout(req, res);

    expect(req.logout).toHaveBeenCalled();
    expect(req.user.deleteToken).toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should return 400 error response when database error occured', async () => {
    const error = {
      message: 'Error',
    };
    const req = {
      user: {
        deleteToken() {
          throw new Error(error.message);
        },
      },
      logout: jest.fn(),
    };
    const res = mockResponse();

    const errorResponse = await AuthController.logout(req, res);

    expect(req.logout).toHaveBeenCalled();
    expect(res.responseStatus).toBe(400);
    expect(errorResponse).toEqual({
      errors: [
        {
          message: error.message,
          errorType: 'clientError',
        },
      ],
    });
  });
});
