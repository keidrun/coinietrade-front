const _ = require('lodash');
const uuid = require('uuid');
const { User } = require('../../src/models/User');
const { setupDatabase } = require('../helpers/databaseHelper');

beforeAll(async () => {
  await setupDatabase();
});

beforeEach(async () => {
  await User.remove({});
});

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
    displayName: 'Peter Griffin with Facebook',
    familyName: 'Griffin',
    givenName: 'Peter',
    middleName: 'Guy',
    email: 'peter@example.com',
    avatarUrl: 'https://somewhere/avatar',
    gender: 'male',
    language: 'en',
    secrets: [],
  },
  {
    _id: uuid.v4(),
    authProvider: {
      name: 'google',
      id: '7341425083475238',
      accessToken:
        'JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIB',
      refreshToken:
        'UNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678',
    },
    displayName: 'Peter Griffin with Google',
    familyName: 'Griffin',
    givenName: 'Peter',
    middleName: 'Guy',
    email: 'peter@example.com',
    avatarUrl: 'https://somewhere/avatar',
    gender: 'male',
    language: 'en',
    secrets: [],
  },
];

describe('User model', () => {
  test('should save a user', async () => {
    const user = new User(users[0]);

    expect(user.isNew).toBeTruthy();
    const savedUser = await user.save();
    expect(savedUser.isNew).toBeFalsy();
  });

  test('should find a facebook user', async () => {
    const user = new User(users[0]);
    const userId = users[0]._id;

    await user.save();
    const foundUser = await User.findById(userId);

    expect(foundUser._id).toBe(users[0]._id);
    expect(foundUser.authProvider).toMatchObject(users[0].authProvider);
    expect(foundUser.displayName).toBe(users[0].displayName);
    expect(foundUser.familyName).toBe(users[0].familyName);
    expect(foundUser.givenName).toBe(users[0].givenName);
    expect(foundUser.middleName).toBe(users[0].middleName);
    expect(foundUser.email).toBe(users[0].email);
    expect(foundUser.avatarUrl).toBe(users[0].avatarUrl);
    expect(foundUser.gender).toBe(users[0].gender);
    expect(foundUser.language).toBe(users[0].language);
    expect(foundUser.secrets).toHaveLength(0);
  });

  test('should find a google user', async () => {
    const user = new User(users[1]);
    const userId = users[1]._id;

    await user.save();
    const foundUser = await User.findById(userId);

    expect(foundUser._id).toBe(users[1]._id);
    expect(foundUser.authProvider).toMatchObject(users[1].authProvider);
    expect(foundUser.displayName).toBe(users[1].displayName);
    expect(foundUser.familyName).toBe(users[1].familyName);
    expect(foundUser.givenName).toBe(users[1].givenName);
    expect(foundUser.middleName).toBe(users[1].middleName);
    expect(foundUser.email).toBe(users[1].email);
    expect(foundUser.avatarUrl).toBe(users[1].avatarUrl);
    expect(foundUser.gender).toBe(users[1].gender);
    expect(foundUser.language).toBe(users[1].language);
    expect(foundUser.secrets).toHaveLength(0);
  });

  test('should create, find and delete token', async () => {
    const user = new User(users[0]);
    const userId = users[0]._id;

    const newUser = await user.save();
    const snappedNewUser = _.cloneDeep(newUser);
    const tokenGeneratedUser = await newUser.generateToken();
    const loggedInUser = await User.findByToken(tokenGeneratedUser.token);
    await loggedInUser.deleteToken();
    const loggedOutUser = await User.findById(userId);

    expect(snappedNewUser.token).toBeUndefined();
    expect(loggedInUser.token).not.toBeUndefined();
    expect(loggedOutUser.token).toBeUndefined();
  });
});
