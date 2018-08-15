import validator from 'validator';
import { isSpaceIncluded } from '../utils';

export function validateSettingForm(values) {
  const errors = {};

  if (!Object.keys(values).length) {
    return errors;
  }

  if (!values.displayName) {
    errors.displayName = 'Enter a name.';
  } else if (values.displayName.length < 4 || values.displayName.length > 40) {
    errors.displayName = 'The length of a name must be between 4 and 40.';
  }

  if (!values.email) {
    errors.email = 'Enter an email.';
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Invalid an email.';
  } else if (values.email && isSpaceIncluded(values.email)) {
    errors.email = 'Cannot use any white spaces.';
  }

  if (!values.language) {
    errors.language = 'Select a language.';
  }

  if (!values.gender) {
    errors.gender = 'Select a gender.';
  }

  if (
    values.bitflyerApiKey &&
    (values.bitflyerApiKey.length < 10 || values.bitflyerApiKey.length > 50)
  ) {
    errors.bitflyerApiKey =
      'The length of a api key must be between 10 and 50.';
  } else if (values.bitflyerApiKey && isSpaceIncluded(values.bitflyerApiKey)) {
    errors.bitflyerApiKey = 'Cannot use any white spaces.';
  }

  if (
    values.bitflyerApiSecret &&
    (values.bitflyerApiSecret.length < 10 ||
      values.bitflyerApiSecret.length > 50)
  ) {
    errors.bitflyerApiSecret =
      'The length of a api secret must be between 10 and 50.';
  } else if (
    values.bitflyerApiSecret &&
    isSpaceIncluded(values.bitflyerApiSecret)
  ) {
    errors.bitflyerApiSecret = 'Cannot use any white spaces.';
  }

  if (
    values.zaifApiKey &&
    (values.zaifApiKey.length < 10 || values.zaifApiKey.length > 50)
  ) {
    errors.zaifApiKey = 'The length of a api key must be between 10 and 50.';
  } else if (values.zaifApiKey && isSpaceIncluded(values.zaifApiKey)) {
    errors.zaifApiKey = 'Cannot use any white spaces.';
  }

  if (
    values.zaifApiSecret &&
    (values.zaifApiSecret.length < 10 || values.zaifApiSecret.length > 50)
  ) {
    errors.zaifApiSecret =
      'The length of a api secret must be between 10 and 50.';
  } else if (values.zaifApiSecret && isSpaceIncluded(values.zaifApiSecret)) {
    errors.zaifApiSecret = 'Cannot use any white spaces.';
  }

  return errors;
}
