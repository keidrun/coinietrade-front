import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import Login from './Menu/Login';
import Logged from './Menu/Logged';

import styles from './Header.css';

class Header extends Component {
  renderTitle() {
    const isLoggedin = this.props.user;

    return (
      <Link
        to={isLoggedin ? '/dashboard' : '/'}
        className={styles.main_icon_link}
      >
        CoinieTrade
      </Link>
    );
  }

  renderContent() {
    const isLoggedin = this.props.user;

    switch (isLoggedin) {
      case null:
        return; // API not working
      case false:
        return <Login />;
      default:
        return <Logged />;
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.renderTitle()}
          iconElementLeft={<div />}
          iconElementRight={this.renderContent()}
        />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Header);
