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
    displayName: 'Peter Griffin with Facebook',
    familyName: 'Griffin',
    givenName: 'Peter',
    middleName: 'Guy',
    email: 'peter@example.com',
    avatarUrl: 'https://somewhere/avatar',
    gender: 'male',
    language: 'en',
    role: 0,
    facebook: {
      accessToken:
        'JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIB',
      refreshToken:
        'UNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678',
      id: '7341425083475238',
      displayName: 'Peter Griffin',
      name: {
        familyName: 'Griffin',
        givenName: 'Peter',
        middleName: 'Guy',
      },
      email: 'peter@example.com',
      avatarUrl: 'https://somewhere/avatar',
      gender: 'male',
    },
  },
  {
    _id: uuid.v4(),
    displayName: 'Peter Griffin with Google',
    familyName: 'Griffin',
    givenName: 'Peter',
    middleName: 'Guy',
    email: 'peter@example.com',
    avatarUrl: 'https://somewhere/avatar',
    gender: 'male',
    language: 'en',
    role: 0,
    google: {
      accessToken:
        'JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIBKUBKGNUHGYKHNYBKVBKUN786HJBGJM76JKHBG654fjvmbjninHHUIH780JNHNUYMJNBHNYBUKNUYIB',
      refreshToken:
        'UNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678KHBGUTYUYKGIUfjbguhjKNBJFVBUKNBGF868766HJKBGIVKUBGIYNBKUIUNKGIUINLHIHKNU787678',
      id: '7341425083475238',
      displayName: 'Peter Griffin',
      name: {
        familyName: 'Griffin',
        givenName: 'Peter',
      },
      email: 'peter@example.com',
      avatarUrl: 'https://somewhere/avatar',
      gender: 'male',
      language: 'en',
    },
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

    expect(foundUser.displayName).toBe('Peter Griffin with Facebook');
  });

  test('should find a google user', async () => {
    const user = new User(users[1]);
    const userId = users[1]._id;

    await user.save();
    const foundUser = await User.findById(userId);

    expect(foundUser.displayName).toBe('Peter Griffin with Google');
  });
});
