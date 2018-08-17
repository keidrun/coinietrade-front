export const EXCHANGE_SITES = {
  BITFLYER: 'bitflyer',
  ZAIF: 'zaif',
};

export const STRATEGIES = {
  SIMPLE_ARBITRAGE: 'simple_arbitrage',
};

export const ORDER_TYPES = {
  LIMIT_ORDER: 'limit_order',
  MARKET_ORDER: 'market_order',
};

export const COINS_PAIR = {
  BTC_JPY: 'btc_jpy',
};

export const COIN_UNITS = {
  BTC: 'btc',
};

export const CURRENCY_UNITS = {
  JPY: 'jpy',
  USD: 'usd',
  CAD: 'cad',
};

export const RULE_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  LOCKED: 'locked',
  DELETED: 'deleted',
};

export const getUnits = coinsPair => {
  switch (coinsPair) {
    case COINS_PAIR.BTC_JPY:
      return {
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.JPY,
      };
    default:
      return {
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.JPY,
      };
  }
};

export const getPair = (coinUnit, currencyUnit) => {
  if (coinUnit === COIN_UNITS.BTC && currencyUnit === CURRENCY_UNITS.JPY) {
    return COINS_PAIR.BTC_JPY;
  } else {
    return COINS_PAIR.BTC_JPY;
  }
};

export const showExchangeSite = exchangeSite => {
  switch (exchangeSite) {
    case EXCHANGE_SITES.BITFLYER:
      return 'Bitflyer';
    case EXCHANGE_SITES.ZAIF:
      return 'Zaif';
    default:
      return '-';
  }
};

export const showPair = coinsPair => {
  switch (coinsPair) {
    case COINS_PAIR.BTC_JPY:
      return 'BTC <=> JPY';
    default:
      return '-';
  }
};

export const showStrategy = strategy => {
  switch (strategy) {
    case STRATEGIES.SIMPLE_ARBITRAGE:
      return 'Simple Arbitrage';
    default:
      return '-';
  }
};

export const showOrderType = orderType => {
  switch (orderType) {
    case ORDER_TYPES.LIMIT_ORDER:
      return 'Limit Order';
    case ORDER_TYPES.MARKET_ORDER:
      return 'Market Order';
    default:
      return '-';
  }
};

export const showAssetMinLimit = (assetMinLimit, currencyUnit) => {
  switch (currencyUnit) {
    case CURRENCY_UNITS.JPY:
      return `${assetMinLimit} [JPY]`;
    case CURRENCY_UNITS.CAD:
      return `${assetMinLimit} [CAD]`;
    case CURRENCY_UNITS.USD:
      return `${assetMinLimit} [USD]`;
    default:
      return '-';
  }
};

export const showProfit = (profit, currencyUnit) => {
  switch (currencyUnit) {
    case CURRENCY_UNITS.JPY:
      return `${profit} [JPY]`;
    case CURRENCY_UNITS.CAD:
      return `${profit} [CAD]`;
    case CURRENCY_UNITS.USD:
      return `${profit} [USD]`;
    default:
      return '-';
  }
};

export const showStatus = status => {
  switch (status) {
    case RULE_STATUS.AVAILABLE:
      return 'Available';
    case RULE_STATUS.UNAVAILABLE:
      return 'Unavailable';
    case RULE_STATUS.LOCKED:
      return 'Locked';
    default:
      return '-';
  }
};

export const showAsPercentage = number => {
  return `${number * 100} [%]`;
};
