import React from 'react';
import { Field } from 'redux-form';

import TextField from 'material-ui/TextField';
import { pinkA200 } from 'material-ui/styles/colors';

export const muiStyles = {
  textField: {
    width: 800,
    height: 50,
    fontSize: '4rem',
    marginLeft: '10%',
  },
  underlineStyle: {
    borderColor: pinkA200,
  },
};

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => {
  return <TextField {...input} errorText={touched && error} {...custom} />;
};

const ReduxFormTextField = ({ ...attr }) => (
  <Field
    component={renderTextField}
    style={muiStyles.textField}
    underlineFocusStyle={muiStyles.underlineStyle}
    {...attr}
  />
);

export default ReduxFormTextField;
