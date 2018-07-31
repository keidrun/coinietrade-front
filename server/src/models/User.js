const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

const LANGUAGE = {
  ENGLISH: 'en',
  JAPANESE: 'jp',
};

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuid.v4(),
  },
  token: String,
  displayName: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
    trim: true,
  },
  familyName: {
    type: String,
    maxlength: 50,
    trim: true,
  },
  givenName: {
    type: String,
    maxlength: 50,
    trim: true,
  },
  middleName: {
    type: String,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  avatarUrl: String,
  gender: {
    type: String,
    enum: Object.values(GENDER),
  },
  language: {
    type: String,
    enum: Object.values(LANGUAGE),
  },
  facebook: {
    accessToken: String,
    refreshToken: String,
    id: String,
  },
  google: {
    accessToken: String,
    refreshToken: String,
    id: String,
  },
});

userSchema.methods.generateToken = function generateToken() {
  const user = this;

  const token = jwt.sign(user._id, keys.tokenSecret);

  user.token = token;

  return new Promise(async (resolve, reject) => {
    try {
      const savedUser = await user.save();
      resolve(savedUser);
    } catch (err) {
      reject(err);
    }
  });
};

userSchema.statics.findByToken = function findByToken(token, cb) {
  const user = this;

  jwt.verify(token, keys.tokenSecret, (err, decodedId) => {
    // eslint-disable-next-line consistent-return
    user.findOne({ _id: decodedId, token }, (err, finedUser) => {
      if (err) return cb(err);
      cb(null, finedUser);
    });
  });
};

userSchema.methods.deleteToken = function deleteToken() {
  const user = this;

  return new Promise(async (resolve, reject) => {
    try {
      const updatedUser = await user.update({ $unset: { token: 1 } });
      resolve(updatedUser);
    } catch (err) {
      reject(err);
    }
  });
};

const User = mongoose.model('users', userSchema);

module.exports = {
  User,
  GENDER,
  LANGUAGE,
};
