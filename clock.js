const http = require('http');

const PING_URL = process.env.PROXY_URL;
const INTERVAL_MSEC = 10 * 60 * 1000;

setInterval(() => {
  http
    .get(PING_URL, res => {
      console.log(res.statusCode, res.statusMessage, PING_URL);
    })
    .on('error', err => {
      console.log(err, PING_URL);
    });
}, INTERVAL_MSEC);
