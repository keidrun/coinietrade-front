import React, { Component } from 'react';
import styled from 'styled-components';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchProfile, updateProfile } from '../../actions';
import { validateSettingForm as validate } from '../../validates';
import { renderErrors } from '../../utils';

import MenuItem from 'material-ui/MenuItem';
import Form from '../common/Form';
import Button from '../common/Button';
import ReduxFormTextField from '../common/ReduxFormTextField';
import ReduxFormSelectField from '../common/ReduxFormSelectField';

const LANGUAGE = {
  ENGLISH: 'en',
  JAPANESE: 'ja',
};

const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

const SettingWrapper = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
  height: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: 'wrap';
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
`;

const StyledTextFieldArea = styled.div`
  margin: 20px auto;

  h4 {
    margin-left: 20px;
    font-size: 3rem;
    display: inline;
  }

  h5 {
    margin-left: 40px;
    font-size: 2.5rem;
    display: inline;
  }

  input {
    font-size: 4rem;
    text-align: center;
  }
`;

const StyledSelectFieldArea = styled.div`
  margin: 20px;

  h4 {
    font-size: 3rem;
    display: inline;
  }

  div {
    font-size: 3rem;
    text-align: center;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  div {
    font-size: 2rem;
    text-align: center;
  }
`;

class Setting extends Component {
  state = {
    initialFormValues: {},
  };

  componentDidMount() {
    this.props.fetchProfile();
  }

  static getDerivedStateFromProps(props, state) {
    const { user } = props.profile;
    if (!props.initialized && user && user.secrets) {
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
      props.initialize(initialValues);
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

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;

    return (
      <div>
        {error ? renderErrors(error) : null}
        <SettingWrapper>
          <h2>Settings</h2>
          <FlexWrapper>
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <StyledTextFieldArea>
                <h4>Name</h4>
                <br />
                <ReduxFormTextField
                  name="displayName"
                  type="text"
                  placeholder="Enter name"
                />
              </StyledTextFieldArea>
              <StyledTextFieldArea>
                <h4>Email</h4>
                <br />
                <ReduxFormTextField
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
              </StyledTextFieldArea>
              <StyledSelectFieldArea>
                <h4>Language</h4>
                <br />
                <ReduxFormSelectField name="language">
                  <StyledMenuItem
                    value={LANGUAGE.ENGLISH}
                    primaryText="English"
                  />
                  <StyledMenuItem
                    value={LANGUAGE.JAPANESE}
                    primaryText="Japanese"
                  />
                </ReduxFormSelectField>
              </StyledSelectFieldArea>
              <StyledSelectFieldArea>
                <h4>Gender</h4>
                <br />
                <ReduxFormSelectField name="gender">
                  <StyledMenuItem value={GENDER.MALE} primaryText="Male" />
                  <StyledMenuItem value={GENDER.FEMALE} primaryText="Female" />
                </ReduxFormSelectField>
              </StyledSelectFieldArea>

              <hr />
              <StyledTextFieldArea>
                <h4>API Keys and Secrets</h4>
                <br />
                <StyledTextFieldArea>
                  <h5>bitflyer</h5>
                  <br />
                  <ReduxFormTextField
                    name="bitflyerApiKey"
                    type="text"
                    placeholder="Enter API Key"
                  />
                  <ReduxFormTextField
                    name="bitflyerApiSecret"
                    type="text"
                    placeholder="Enter API Secret"
                  />
                </StyledTextFieldArea>
                <StyledTextFieldArea>
                  <h5>zaif</h5>
                  <br />
                  <ReduxFormTextField
                    name="zaifApiKey"
                    type="text"
                    placeholder="Enter API Key"
                  />
                  <ReduxFormTextField
                    name="zaifApiSecret"
                    type="text"
                    placeholder="Enter API Secret"
                  />
                </StyledTextFieldArea>
              </StyledTextFieldArea>

              <Button type="submit" disabled={pristine || submitting}>
                Update
              </Button>
            </Form>
          </FlexWrapper>
        </SettingWrapper>
      </div>
    );
  }
}

function mapStateToProps({ profile, error }) {
  return { profile, error };
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
