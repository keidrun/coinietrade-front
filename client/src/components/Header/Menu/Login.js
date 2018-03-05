import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';

import styles from './Menu.css';

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <div>
        <FlatButton
          {...this.props}
          label={
            <span>
              <a href="/auth/facebook" className={styles.nav_login_link}>
                <FontAwesome name="fab fa-facebook" /> Login
              </a>
            </span>
          }
        />

        <FlatButton
          {...this.props}
          label={
            <span>
              <a href="/auth/google" className={styles.nav_login_link}>
                <FontAwesome name="fab fa-google" /> Login
              </a>
            </span>
          }
        />
      </div>
    );
  }
}

export default Login;
