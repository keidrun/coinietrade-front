const expect = require('chai').expect;

describe('User-test', () => {
  describe('canary-test', () => {
    it('should pass this canary test', done => {
      expect(true).to.be.true;
      done();
    });
  });
});
