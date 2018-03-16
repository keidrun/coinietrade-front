const axios = require('axios');

const endpoint = {
  bitflyer: 'https://api.bitflyer.jp/v1',
  coincheck: 'https://coincheck.com',
  zaif: 'https://api.zaif.jp/api/1'
};

const getAllTickers = async () => {
  try {
    const resBF = await axios.get(
      `${endpoint.bitflyer}/ticker?product_code=BTC_JPY`
    );
    const resCC = await axios.get(`${endpoint.coincheck}/api/ticker`);
    const resZF = await axios.get(`${endpoint.zaif}/ticker/btc_jpy`);

    return {
      bitflyer: {
        bid: resBF.data.best_bid,
        ask: resBF.data.best_ask,
        last: resBF.data.ltp
      },
      coincheck: {
        bid: resCC.data.bid,
        ask: resCC.data.ask,
        last: resCC.data.last
      },
      zaif: {
        bid: resZF.data.bid,
        ask: resZF.data.ask,
        last: resZF.data.last
      }
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllTickers
};
