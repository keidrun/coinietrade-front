import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../actions';

import AppBar from 'material-ui/AppBar';
import Login from './Menu/Login';
import Logged from './Menu/Logged';

import styles from './Header.css';

class Header extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

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
    const isLogged = this.props.user;

    switch (isLogged) {
      case null: // API not working
        return;
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

export default connect(
  mapStateToProps,
  { fetchUser },
)(Header);
