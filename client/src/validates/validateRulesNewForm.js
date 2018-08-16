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

  if (!values.assetRange) {
    errors.assetRange = 'Enter an asset range.';
  } else if (!validator.isNumeric(values.assetRange)) {
    errors.assetRange = 'Must be number.';
  } else if (values.assetRange < 0 || values.assetRange > 1) {
    errors.assetRange = 'The number must be between 0 and 1.';
  }

  if (!values.buyWeightRate) {
    errors.buyWeightRate = 'Enter a buy weight rate.';
  } else if (!validator.isNumeric(values.buyWeightRate)) {
    errors.buyWeightRate = 'Must be number.';
  } else if (values.buyWeightRate < 0 || values.buyWeightRate > 2) {
    errors.buyWeightRate = 'The number must be between 0 and 2.';
  }

  if (!values.sellWeightRate) {
    errors.sellWeightRate = 'Enter a sell weight rate.';
  } else if (!validator.isNumeric(values.sellWeightRate)) {
    errors.sellWeightRate = 'Must be number.';
  } else if (values.sellWeightRate < 0 || values.sellWeightRate > 2) {
    errors.sellWeightRate = 'The number must be between 0 and 2.';
  }

  return errors;
}
