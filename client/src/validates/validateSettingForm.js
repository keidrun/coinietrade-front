import validator from 'validator';

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
  }

  if (!values.language) {
    errors.language = 'Select a language.';
  }

  if (!values.gender) {
    errors.gender = 'Select a gender.';
  }

  return errors;
}
