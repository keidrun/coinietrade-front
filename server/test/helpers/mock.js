const mockResponse = () => ({
  send(messageObj) {
    return messageObj;
  },
  json(messageObj) {
    return messageObj;
  },
  status(responseStatus) {
    this.responseStatus = responseStatus;
    return this;
  },
});

module.exports = {
  mockResponse,
};
