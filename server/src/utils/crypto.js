const crypto = require('crypto');
const keys = require('../config/keys').get(process.env.NODE_ENV);
const ALGORITHM = 'aes-128-cbc';

function encrypt(rawText) {
  const cipher = crypto.createCipher(ALGORITHM, keys.encryptKey);
  let encrypted = cipher.update(rawText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipher(ALGORITHM, keys.encryptKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };
