import React from 'react';
import { Field } from 'redux-form';

import SelectField from 'material-ui/SelectField';
import { pinkA200 } from 'material-ui/styles/colors';

const muiStyles = {
  selectField: {
    width: 800,
    height: 50,
    fontSize: '4rem',
    marginLeft: '10%',
  },
  underlineStyle: {
    borderColor: pinkA200,
  },
};

const renderSelectField = ({
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

const ReduxFormSelectField = ({ children, ...attr }) => (
  <Field
    component={renderSelectField}
    style={muiStyles.selectField}
    underlineFocusStyle={muiStyles.underlineStyle}
    {...attr}
  >
    {children}
  </Field>
);

export default ReduxFormSelectField;
