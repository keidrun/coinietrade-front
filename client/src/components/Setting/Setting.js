import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchProfile, updateProfile } from '../../actions';
import { validateSettingForm as validate } from '../../validates';

import styles from './Setting.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { pinkA200 } from 'material-ui/styles/colors';

const muiStyles = {
  button: {
    width: 200,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: '75%',
  },
  textField: {
    width: 800,
    height: 50,
    fontSize: '4rem',
    marginLeft: '10%',
  },
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

const LANGUAGE = {
  ENGLISH: 'en',
  JAPANESE: 'ja',
};

const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

class Setting extends Component {
  state = {
    initialFormValues: {},
  };

  componentDidMount() {
    this.props.fetchProfile();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps.profile;
    if (!nextProps.initialized && user && user.secrets) {
      const { secrets } = user;
      const initialValues = user
        ? {
            displayName: user.displayName,
            email: user.email,
            language: user.language,
            gender: user.gender,
            bitflyerApiKey: secrets.bitflyer ? secrets.bitflyer.apiKeyTail : '',
            bitflyerApiSecret: secrets.bitflyer
              ? secrets.bitflyer.apiSecretTail
              : '',
            zaifApiKey: secrets.zaif ? secrets.zaif.apiKeyTail : '',
            zaifApiSecret: secrets.zaif ? secrets.zaif.apiSecretTail : '',
          }
        : {};
      nextProps.initialize(initialValues);
      return { initialFormValues: initialValues };
    }
    return null;
  }

  onSubmit(values) {
    const user = values;
    const secrets = {};

    if (user.bitflyerApiKey === '' && user.bitflyerApiSecret === '') {
      secrets.bitflyer = {};
    } else if (
      user.bitflyerApiKey !== this.state.initialFormValues.bitflyerApiKey &&
      user.bitflyerApiSecret !== this.state.initialFormValues.bitflyerApiSecret
    ) {
      secrets.bitflyer = {
        apiKey: user.bitflyerApiKey,
        apiSecret: user.bitflyerApiSecret,
      };
    }

    if (user.zaifApiKey === '' && user.zaifApiSecret === '') {
      secrets.zaif = {};
    } else if (
      user.zaifApiKey !== this.state.initialFormValues.zaifApiKey &&
      user.zaifApiSecret !== this.state.initialFormValues.zaifApiSecret
    ) {
      secrets.zaif = {
        apiKey: user.zaifApiKey,
        apiSecret: user.zaifApiSecret,
      };
    }

    user.secrets = secrets;

    const profile = { user };
    return this.props.updateProfile(profile);
  }

  renderTextField({ input, meta: { touched, error }, ...custom }) {
    return <TextField {...input} errorText={touched && error} {...custom} />;
  }

  renderSelectField({ input, meta: { touched, error }, children, ...custom }) {
    return (
      <SelectField
        {...input}
        errorText={touched && error}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    );
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className={styles.setting}>
        <h2>Settings</h2>
        <div className={styles.flex_wrapper}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <div className={styles.text_field}>
              <h4>Name</h4>
              <br />
              <Field
                name="displayName"
                component={this.renderTextField}
                type="text"
                placeholder="Enter name"
                style={muiStyles.textField}
                underlineFocusStyle={muiStyles.underlineStyle}
              />
            </div>
            <div className={styles.text_field}>
              <h4>Email</h4>
              <br />
              <Field
                name="email"
                component={this.renderTextField}
                type="email"
                placeholder="Enter email"
                style={muiStyles.textField}
                underlineFocusStyle={muiStyles.underlineStyle}
              />
            </div>
            <div className={styles.select_field}>
              <h4>Language</h4>
              <br />
              <Field
                name="language"
                component={this.renderSelectField}
                style={muiStyles.selectField}
                underlineFocusStyle={muiStyles.underlineStyle}
              >
                <MenuItem
                  className={styles.select_item}
                  value={LANGUAGE.ENGLISH}
                  primaryText="English"
                />
                <MenuItem
                  className={styles.select_item}
                  value={LANGUAGE.JAPANESE}
                  primaryText="Japanese"
                />
              </Field>
            </div>
            <div className={styles.select_field}>
              <h4>Gender</h4>
              <br />
              <Field
                name="gender"
                component={this.renderSelectField}
                style={muiStyles.selectField}
                underlineFocusStyle={muiStyles.underlineStyle}
              >
                <MenuItem
                  className={styles.select_item}
                  value={GENDER.MALE}
                  primaryText="Male"
                />
                <MenuItem
                  className={styles.select_item}
                  value={GENDER.FEMALE}
                  primaryText="Female"
                />
              </Field>
            </div>

            <hr />
            <div className={styles.text_field}>
              <h4>API Keys and Secrets</h4>
              <br />
              <div className={styles.text_field}>
                <h5>bitflyer</h5>
                <br />
                <Field
                  name="bitflyerApiKey"
                  component={this.renderTextField}
                  type="text"
                  placeholder="Enter API Key"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
                <Field
                  name="bitflyerApiSecret"
                  component={this.renderTextField}
                  type="text"
                  placeholder="Enter API Secret"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
              </div>
              <div className={styles.text_field}>
                <h5>zaif</h5>
                <br />
                <Field
                  name="zaifApiKey"
                  component={this.renderTextField}
                  type="text"
                  placeholder="Enter API Key"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
                <Field
                  name="zaifApiSecret"
                  component={this.renderTextField}
                  type="text"
                  placeholder="Enter API Secret"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
              </div>
            </div>

            <div className={styles.button_area}>
              <RaisedButton
                secondary={true}
                style={muiStyles.button}
                type="submit"
                disabled={pristine || submitting}
              >
                Update
              </RaisedButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return { profile };
}

export default reduxForm({
  form: 'SettingForm',
  validate,
})(
  connect(
    mapStateToProps,
    { fetchProfile, updateProfile },
  )(Setting),
);
