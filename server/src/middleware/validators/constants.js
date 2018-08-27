const STRATEGIES = {
  SIMPLE_ARBITRAGE: 'simple_arbitrage',
};

const ORDER_TYPES = {
  LIMIT_ORDER: 'limit_order',
  MARKET_ORDER: 'market_order',
};

const COIN_UNITS = {
  BTC: 'btc',
};

const CURRENCY_UNITS = {
  JPY: 'jpy',
  USD: 'usd',
  CAD: 'cad',
};

const EXCHANGE_SITES = {
  BITFLYER: 'bitflyer',
  ZAIF: 'zaif',
};

const RULE_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  LOCKED: 'locked',
  DELETED: 'deleted',
};

module.exports = {
  STRATEGIES,
  ORDER_TYPES,
  COIN_UNITS,
  CURRENCY_UNITS,
  EXCHANGE_SITES,
  RULE_STATUS,
};
