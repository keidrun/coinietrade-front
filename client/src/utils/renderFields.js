import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

export const renderTextField = ({
  input,
  meta: { touched, error },
  ...custom
}) => {
  return <TextField {...input} errorText={touched && error} {...custom} />;
};

export const renderSelectField = ({
  input,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <SelectField
      {...input}
      errorText={touched && error}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );
};
