const expect = require('chai').expect;
const { ObjectID } = require('mongodb');
const User = require('../../src/models/User');

const users = [
  {
    _id: new ObjectID(),
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
        middleName: 'Guy'
      },
      email: 'peter@example.com',
      avatarUrl: 'https://somewhere/avatar',
      gender: 'male'
    }
  },
  {
    _id: new ObjectID(),
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
        givenName: 'Peter'
      },
      email: 'peter@example.com',
      avatarUrl: 'https://somewhere/avatar',
      gender: 'male',
      language: 'en'
    }
  }
];

beforeEach(() => {
  return User.remove({});
});

describe('User model', () => {
  it('should save a user', () => {
    const user = new User(users[0]);

    expect(user.isNew).to.be.true;
    return user.save().then(() => {
      expect(user.isNew).to.be.false;
    });
  });

  it('should find a facebook user', () => {
    const user = new User(users[0]);
    const userId = users[0]._id;

    return user.save().then(() => {
      return User.findById(userId).then(user => {
        expect(user.displayName).to.equal('Peter Griffin with Facebook');
      });
    });
  });

  it('should find a google user', () => {
    const user = new User(users[1]);
    const userId = users[1]._id;

    return user.save().then(() => {
      return User.findById(userId).then(user => {
        expect(user.displayName).to.equal('Peter Griffin with Google');
      });
    });
  });
});
