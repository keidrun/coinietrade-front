const mongoose = require('mongoose');
const { Schema } = mongoose;
const { encrypt, decrypt } = require('../utils/crypto');

const apikeySchema = new Schema({
  bitflyer: {
    key: {
      type: String
    },
    secret: {
      type: String
    }
  },
  zaif: {
    key: {
      type: String
    },
    secret: {
      type: String
    }
  },
  coincheck: {
    key: {
      type: String
    },
    secret: {
      type: String
    }
  }
});

apikeySchema.pre('save', function(next) {
  let apikey = this;

  if (apikey.isModified('bitflyer.key')) {
    const encryptedKey = encrypt(apikey.bitflyer.key);
    apikey.bitflyer.key = encryptedKey;
  }
  if (apikey.isModified('bitflyer.secret')) {
    const encryptedSecret = encrypt(apikey.bitflyer.secret);
    apikey.bitflyer.secret = encryptedSecret;
  }

  if (apikey.isModified('zaif.key')) {
    const encryptedKey = encrypt(apikey.zaif.key);
    apikey.zaif.key = encryptedKey;
  }
  if (apikey.isModified('zaif.secret')) {
    const encryptedSecret = encrypt(apikey.zaif.secret);
    apikey.zaif.secret = encryptedSecret;
  }

  if (apikey.isModified('coincheck.key')) {
    const encryptedKey = encrypt(apikey.coincheck.key);
    apikey.coincheck.key = encryptedKey;
  }
  if (apikey.isModified('coincheck.secret')) {
    const encryptedSecret = encrypt(apikey.coincheck.secret);
    apikey.coincheck.secret = encryptedSecret;
  }

  next();
});

// hook for findOneAndUpdate and findByIdAndUpdate
apikeySchema.pre('findOneAndUpdate', function(next) {
  let apikey = this.getUpdate();

  if (apikey.bitflyer.key) {
    const encryptedKey = encrypt(apikey.bitflyer.key);
    apikey.bitflyer.key = encryptedKey;
  }
  if (apikey.bitflyer.secret) {
    const encryptedSecret = encrypt(apikey.bitflyer.secret);
    apikey.bitflyer.secret = encryptedSecret;
  }

  if (apikey.zaif.key) {
    const encryptedKey = encrypt(apikey.zaif.key);
    apikey.zaif.key = encryptedKey;
  }
  if (apikey.zaif.secret) {
    const encryptedSecret = encrypt(apikey.zaif.secret);
    apikey.zaif.secret = encryptedSecret;
  }

  if (apikey.coincheck.key) {
    const encryptedKey = encrypt(apikey.coincheck.key);
    apikey.coincheck.key = encryptedKey;
  }
  if (apikey.coincheck.secret) {
    const encryptedSecret = encrypt(apikey.coincheck.secret);
    apikey.coincheck.secret = encryptedSecret;
  }

  next();
});

// hook for findOne and findById
apikeySchema.post('findOne', function(apikey) {
  apikey.bitflyer.key = decrypt(apikey.bitflyer.key);
  apikey.bitflyer.secret = decrypt(apikey.bitflyer.secret);
  apikey.zaif.key = decrypt(apikey.zaif.key);
  apikey.zaif.secret = decrypt(apikey.zaif.secret);
  apikey.coincheck.key = decrypt(apikey.coincheck.key);
  apikey.coincheck.secret = decrypt(apikey.coincheck.secret);
});

const Apikeys = mongoose.model('apikeys', apikeySchema);

module.exports = Apikeys;
