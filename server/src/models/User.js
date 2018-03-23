const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const keys = require('../config/keys').get(process.env.NODE_ENV);

const userSchema = new Schema({
  displayName: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  },
  familyName: {
    type: String,
    maxlength: 50
  },
  givenName: {
    type: String,
    maxlength: 50
  },
  middleName: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  avatarUrl: String,
  gender: String,
  language: String,
  role: {
    type: Number,
    default: 0
  },
  token: String,
  facebook: {
    accessToken: String,
    refreshToken: String,
    id: String,
    displayName: String,
    name: {
      familyName: String,
      givenName: String,
      middleName: String
    },
    email: String,
    avatarUrl: String,
    gender: String
  },
  google: {
    accessToken: String,
    refreshToken: String,
    id: String,
    displayName: String,
    name: {
      familyName: String,
      givenName: String
    },
    email: String,
    avatarUrl: String,
    gender: String,
    language: String
  },
  settingId: {
    type: String
  },
  apikeyId: {
    type: String
  }
});

userSchema.methods.generateToken = function() {
  let user = this;

  const token = jwt.sign(user._id.toHexString(), keys.tokenSecret);

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

userSchema.statics.findByToken = function(token, cb) {
  let user = this;

  jwt.verify(token, keys.tokenSecret, function(err, decodedId) {
    user.findOne({ _id: decodedId, token: token }, function(err, user) {
      if (err) return cb(err);

      cb(null, user);
    });
  });
};

userSchema.methods.deleteToken = function(token) {
  let user = this;

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

module.exports = User;
