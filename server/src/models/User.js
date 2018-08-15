const { promisify } = require('util');
const mongoose = require('mongoose');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const { Schema } = mongoose;
const verifyPromise = promisify(jwt.verify);

const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

const LANGUAGE = {
  ENGLISH: 'en',
  JAPANESE: 'ja',
};

const EXCHANGE_SITES = {
  BITFLYER: 'bitflyer',
  ZAIF: 'zaif',
};

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuid.v4(),
  },
  authProvider: {
    name: String,
    id: {
      type: String,
      unique: true,
    },
    accessToken: String,
    refreshToken: String,
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
    sparse: true,
  },
  avatarUrl: String,
  gender: {
    type: String,
    enum: Object.values(GENDER),
  },
  language: {
    type: String,
    enum: Object.values(LANGUAGE),
    default: LANGUAGE.ENGLISH,
  },
  secrets: {
    type: Array,
    default: [],
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
    } catch (error) {
      reject(error);
    }
  });
};

userSchema.statics.findByToken = function findByToken(token) {
  const user = this;

  return new Promise(async (resolve, reject) => {
    try {
      const decodedId = await verifyPromise(token, keys.tokenSecret);
      const foundUser = await user.findOne({ _id: decodedId, token });
      resolve(foundUser);
    } catch (error) {
      reject(error);
    }
  });
};

userSchema.methods.deleteToken = function deleteToken() {
  const user = this;

  return new Promise(async (resolve, reject) => {
    try {
      const updatedUser = await user.update({ $unset: { token: 1 } });
      resolve(updatedUser);
    } catch (error) {
      reject(error);
    }
  });
};

const User = mongoose.model('users', userSchema);

module.exports = {
  User,
  GENDER,
  LANGUAGE,
  EXCHANGE_SITES,
};
