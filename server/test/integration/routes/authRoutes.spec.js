const supertest = require('supertest');
const faker = require('faker');
const uuid = require('uuid');
const {
  User,
  Privilege,
  PRIVILEGE_ROLES,
  PRIVILEGE_PERMISSIONS,
} = require('../../../src/models');
const keys = require('../../../config/keys').get(process.env.NODE_ENV);

const server = require('../../../src/server');

beforeAll(async () => {
  await Privilege.remove({});
  const privilege = new Privilege({
    role: PRIVILEGE_ROLES.DEFAULT,
    permissions: [
      PRIVILEGE_PERMISSIONS.AUTH,
      PRIVILEGE_PERMISSIONS.EVENTS,
      PRIVILEGE_PERMISSIONS.USER,
      PRIVILEGE_PERMISSIONS.RULES,
      PRIVILEGE_PERMISSIONS.POLICY,
    ],
  });
  await privilege.save();
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

describe('The auth routes test', () => {
  test('GET /api/v1/auth/', async () => {
    const user = new User(users[0]);
    await user.save();
    user.generateToken();

    const response = await supertest(server)
      .get('/api/v1/auth/')
      .set('Cookie', [`${keys.cookieKey}=${user.token}`])
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: user._id,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    });
  });

  test('GET /api/v1/auth/logout', async () => {
    const user = new User(users[0]);
    await user.save();
    user.generateToken();

    const response = await supertest(server)
      .get('/api/v1/auth/logout')
      .set('Cookie', [`${keys.cookieKey}=${user.token}`])
      .send();

    expect(response.status).toBe(302);
  });
});
