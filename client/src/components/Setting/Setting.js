import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, updateProfile } from '../../actions';

class Setting extends Component {
  state = {
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
    console.log(nextProfile);
    this.setState({
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

    this.props.updateProfile({
      ...this.state.formdata
    });
  };

  render() {
    return (
      <div>
        <h2>Setting</h2>
        <form onSubmit={this.submitForm}>
          <div>
            <span>Name : </span>
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.formdata.user.displayName}
              onChange={event => this.handleInput(event, 'displayName')}
            />
          </div>

          <div>
            <span>Email : </span>
            <input
              type="email"
              placeholder="Enter email"
              value={this.state.formdata.user.email}
              onChange={event => this.handleInput(event, 'email')}
            />
          </div>

          <div>
            <span>Gender : </span>
            <select
              value={this.state.formdata.user.gender}
              onChange={event => this.handleInput(event, 'gender')}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>

          <div>
            <span>Language : </span>
            <select
              value={this.state.formdata.user.language}
              onChange={event => this.handleInput(event, 'language')}
            >
              <option value="en">English</option>
              <option value="jp">Japanese</option>
            </select>
          </div>

          <div>
            <section>
              <span>Chart : </span>
              <input
                type="checkbox"
                name="chart"
                value={this.state.formdata.setting.chartSet.bitflyerChart}
                checked={this.state.formdata.setting.chartSet.bitflyerChart}
                onChange={event => this.handleCheckbox(event, 'bitflyerChart')}
              />
              <label htmlFor="bitflyerChart">bitflyer</label>
              <input
                type="checkbox"
                name="chart"
                value={this.state.formdata.setting.chartSet.coincheckChart}
                checked={this.state.formdata.setting.chartSet.coincheckChart}
                onChange={event => this.handleCheckbox(event, 'coincheckChart')}
              />
              <label htmlFor="coincheckChart">coincheck</label>
              <input
                type="checkbox"
                name="chart"
                value={this.state.formdata.setting.chartSet.zaifChart}
                checked={this.state.formdata.setting.chartSet.zaifChart}
                onChange={event => this.handleCheckbox(event, 'zaifChart')}
              />
              <label htmlFor="zaifChart">zaif</label>
            </section>
          </div>

          <button type="submit">Update</button>
        </form>
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
