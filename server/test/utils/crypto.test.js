const expect = require('chai').expect;
const { encrypt, decrypt } = require('../../src/utils/crypto');

describe('crypto-test', () => {
  describe('encrypt-test', () => {
    it('should encrypt a text', () => {
      const encrypted = encrypt('text');
      expect(encrypted).to.be.a('string');
      expect(encrypted).to.equal('941035ea3c15d2a22c304bf5bf2d779d');
    });
  });

  describe('decrypt-test', () => {
    it('should decrypt an encrypted test', () => {
      const decrypted = decrypt('941035ea3c15d2a22c304bf5bf2d779d');
      expect(decrypted).to.be.a('string');
      expect(decrypted).to.equal('text');
    });
  });
});
