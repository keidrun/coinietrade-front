import validator from 'validator';

export function validateRulesNewForm(values) {
  const errors = {};

  if (!Object.keys(values).length) {
    return errors;
  }

  if (!values.oneSiteName) {
    errors.oneSiteName = 'Select an exchange site A.';
  }

  if (!values.otherSiteName) {
    errors.otherSiteName = 'Select an exchange site B.';
  }

  if (
    values.oneSiteName &&
    values.otherSiteName &&
    values.oneSiteName === values.otherSiteName
  ) {
    errors.oneSiteName =
      'Select a different exchange site in a site A and a site B.';
    errors.otherSiteName =
      'Select a different exchange site in a site A and a site B.';
  }

  if (!values.coinsPair) {
    errors.coinsPair = 'Select a pair.';
  }

  if (!values.strategy) {
    errors.strategy = 'Select a strategy.';
  }

  if (!values.orderType) {
    errors.orderType = 'Select an order type.';
  }

  if (!values.assetMinLimit) {
    errors.assetMinLimit = 'Enter an asset minimum limit price.';
  } else if (!validator.isNumeric(values.assetMinLimit)) {
    errors.assetMinLimit = 'Must be number.';
  } else if (values.assetMinLimit < 0) {
    errors.assetMinLimit = 'The number must be greater than or equal to 0.';
  }

  if (!values.assetRangePercentage) {
    errors.assetRangePercentage = 'Enter an asset range.';
  } else if (!validator.isNumeric(values.assetRangePercentage)) {
    errors.assetRangePercentage = 'Must be number.';
  } else if (
    values.assetRangePercentage < 0 ||
    values.assetRangePercentage > 100
  ) {
    errors.assetRangePercentage =
      'The number must be between 0 [%] and 100 [%].';
  }

  if (!values.buyWeightRatePercentage) {
    errors.buyWeightRatePercentage = 'Enter a buy weight rate.';
  } else if (!validator.isNumeric(values.buyWeightRatePercentage)) {
    errors.buyWeightRatePercentage = 'Must be number.';
  } else if (
    values.buyWeightRatePercentage < 0 ||
    values.buyWeightRatePercentage > 200
  ) {
    errors.buyWeightRatePercentage =
      'The number must be between 0 [%] and 200 [%].';
  }

  if (!values.sellWeightRatePercentage) {
    errors.sellWeightRatePercentage = 'Enter a sell weight rate.';
  } else if (!validator.isNumeric(values.sellWeightRatePercentage)) {
    errors.sellWeightRatePercentage = 'Must be number.';
  } else if (
    values.sellWeightRatePercentage < 0 ||
    values.sellWeightRatePercentage > 200
  ) {
    errors.sellWeightRatePercentage =
      'The number must be between 0 [%] and 200 [%].';
  }

  return errors;
}
