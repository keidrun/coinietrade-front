import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, updateProfile } from '../../actions';

import styles from './Setting.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import { pinkA200 } from 'material-ui/styles/colors';

const muiStyles = {
  button: {
    margin: 12,
    width: 200,
    height: 50
  },
  textField: {
    width: 600,
    height: 50,
    fontSize: '4rem'
  },
  underlineStyle: {
    borderColor: pinkA200
  }
};

class Setting extends Component {
  state = {
    isDisabled: true,
    formdata: {
      user: {
        displayName: '',
        email: '',
        gender: '',
        language: ''
      },
      setting: {
        chartSet: {
          bitflyerChart: true,
          coincheckChart: true,
          zaifChart: true
        }
      }
    }
  };

  componentWillMount() {
    this.props.fetchProfile();
  }

  checkedProperty = (profile, group, name, defaultValue) => {
    return profile.hasOwnProperty(group) && profile[group].hasOwnProperty(name)
      ? profile[group][name]
      : defaultValue;
  };

  componentWillReceiveProps(nextProps) {
    const nextProfile = nextProps.profile;
    this.setState({
      isDisabled: false,
      formdata: {
        user: {
          displayName: this.checkedProperty(
            nextProfile,
            'user',
            'displayName',
            ''
          ),
          email: this.checkedProperty(nextProfile, 'user', 'email', ''),
          gender: this.checkedProperty(nextProfile, 'user', 'gender', 'male'),
          language: this.checkedProperty(nextProfile, 'user', 'language', 'en')
        },
        setting: {
          chartSet: this.checkedProperty(nextProfile, 'setting', 'chartSet', {
            bitflyerChart: true,
            coincheckChart: true,
            zaifChart: true
          })
        }
      }
    });
  }

  handleInput = (event, name) => {
    let newFormdata = {
      ...this.state.formdata
    };
    newFormdata.user[name] = event.target.value;

    this.setState({
      formdata: newFormdata
    });
  };

  handleSelectField = (event, index, value, name) => {
    let newFormdata = {
      ...this.state.formdata
    };
    newFormdata.user[name] = value;

    this.setState({
      formdata: newFormdata
    });
  };

  handleCheckbox = (event, name) => {
    let newFormdata = {
      ...this.state.formdata
    };
    newFormdata.setting.chartSet[name] =
      event.target.value === 'true' ? false : true;

    this.setState({
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    this.setState({ isDisabled: true });

    this.props.updateProfile({
      ...this.state.formdata
    });
  };

  render() {
    return (
      <div className={styles.setting}>
        <h2>Settings</h2>
        <div className={styles.flex_wrapper}>
          <form onSubmit={this.submitForm} className={styles.form}>
            <div className={styles.text_field}>
              <h4>Name</h4>
              <br />
              <TextField
                id="1"
                type="text"
                placeholder="Enter name"
                value={this.state.formdata.user.displayName}
                onChange={event => this.handleInput(event, 'displayName')}
                disabled={this.state.isDisabled}
                underlineFocusStyle={muiStyles.underlineStyle}
                style={muiStyles.textField}
              />
            </div>

            <div className={styles.text_field}>
              <h4>Email</h4>
              <br />
              <TextField
                id="2"
                type="email"
                placeholder="Enter email"
                value={this.state.formdata.user.email}
                onChange={event => this.handleInput(event, 'email')}
                disabled={this.state.isDisabled}
                underlineFocusStyle={muiStyles.underlineStyle}
                style={muiStyles.textField}
              />
            </div>

            <div className={styles.select_field}>
              <h4>Gender</h4>
              <br />
              <SelectField
                underlineFocusStyle={muiStyles.underlineStyle}
                value={this.state.formdata.user.gender}
                onChange={(event, index, value) =>
                  this.handleSelectField(event, index, value, 'gender')
                }
                disabled={this.state.isDisabled}
              >
                <MenuItem
                  className={styles.select_item}
                  value="male"
                  primaryText="Male"
                />
                <MenuItem
                  className={styles.select_item}
                  value="female"
                  primaryText="Female"
                />
              </SelectField>
            </div>

            <div className={styles.select_field}>
              <h4>Language</h4>
              <br />
              <SelectField
                underlineFocusStyle={muiStyles.underlineStyle}
                value={this.state.formdata.user.language}
                onChange={(event, index, value) =>
                  this.handleSelectField(event, index, value, 'language')
                }
                disabled={this.state.isDisabled}
              >
                <MenuItem
                  className={styles.select_item}
                  value="en"
                  primaryText="English"
                />
                <MenuItem
                  className={styles.select_item}
                  value="jp"
                  primaryText="Japanese"
                />
              </SelectField>
            </div>

            <div className={styles.checkbox_area}>
              <section>
                <h4>Chart</h4>
                <br />
                <Checkbox
                  type="checkbox"
                  name="chart"
                  value={this.state.formdata.setting.chartSet.bitflyerChart}
                  checked={this.state.formdata.setting.chartSet.bitflyerChart}
                  onCheck={event => this.handleCheckbox(event, 'bitflyerChart')}
                  disabled={this.state.isDisabled}
                  label="bitflyer"
                  labelPosition="left"
                  className={styles.checkbox}
                />
                <Checkbox
                  type="checkbox"
                  name="chart"
                  value={this.state.formdata.setting.chartSet.coincheckChart}
                  checked={this.state.formdata.setting.chartSet.coincheckChart}
                  onCheck={event =>
                    this.handleCheckbox(event, 'coincheckChart')
                  }
                  disabled={this.state.isDisabled}
                  label="coincheck"
                  labelPosition="left"
                  className={styles.checkbox}
                />
                <Checkbox
                  type="checkbox"
                  name="chart"
                  value={this.state.formdata.setting.chartSet.zaifChart}
                  checked={this.state.formdata.setting.chartSet.zaifChart}
                  onCheck={event => this.handleCheckbox(event, 'zaifChart')}
                  disabled={this.state.isDisabled}
                  label="zaif"
                  labelPosition="left"
                  className={styles.checkbox}
                />
              </section>
            </div>

            <br />
            <div className={styles.button_area}>
              <RaisedButton
                secondary={true}
                style={muiStyles.button}
                type="submit"
                disabled={this.state.isDisabled}
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

export default connect(mapStateToProps, { fetchProfile, updateProfile })(
  Setting
);
